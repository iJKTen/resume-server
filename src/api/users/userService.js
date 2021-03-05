'use strict';

const { config } = require('../../config');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { eventEmitter, ...email } = require('../../services');
const { HttpError } = require('../../utils');

const getSalt = async () => await bcrypt.genSalt(config.crpyto.BCRYPT_WORK_FACTOR);

const encrypt = async (password) => {
    const salt = await getSalt();
    return await bcrypt.hash(password, salt);
};

module.exports = (repository) => {
    return {
        create: async (registration) => {
            const existingUser = await repository.getByEmail(registration.email);
            if (existingUser) {
                const err = new HttpError.HttpConflict('Email address is taken', null);
                throw err;
            }

            const { password_confirmation, ...registrationUser } = {
                ...registration,
                password: await encrypt(registration.password)
            };

            const user = await repository.create(registrationUser);

            return {
                _id: user._id,
                email: user.email
            };
        },
        get: async (userId) => {
            const user = await repository.getById(userId);
            if (user) {
                return user;
            }
            throw new HttpError.HttpNotFound('User not found', null);
        },
        isAvailable: async (obj) => {
            const user = await repository.getByEmail(obj.email.toLowerCase());
            if (user) {
                return {
                    'email': user.email
                };
            }
            throw new HttpError.HttpNotFound('User not found', null);
        },
        forgotPassword: async (user) => {
            const expirationInMinutes = 15;
            const now = new Date();
            const salt = await getSalt();
            const token = await crypto.randomBytes(32).toString('hex');
            const digest = await bcrypt.hash(token, salt);
            const tokenExp = new Date(now.getTime() + (expirationInMinutes * 60000));

            const userObj = await repository.forgotPassword(user.email, token, digest, tokenExp);
            const data = {
                email: user.email,
                link: `${config.origin}/resetpassword/${userObj.value._id}/${token}`
            };

            eventEmitter.emit('forgotPassword', email.forgotPassword, data);
        },
        resetPassword: async (userId, token, user) => {
            const existingUser = await repository.getById(userId);
            const passwordIsAMatch = await bcrypt.compare(token, existingUser.resetPwdDigest);

            if (!passwordIsAMatch) {
                const err = new HttpError.HttpNotFound('Password reset token not found', null);
                throw err;
            }

            const now = new Date();

            if (now > existingUser.resetPwdTokenExp) {
                const err = new HttpError.HttpExpired('Password link expired', null);
                throw err;
            }

            const newPassword = await encrypt(user.password);
            await repository.changePassword(userId, newPassword);
        },
        changePassword: async (userId, obj) => {
            const password = await encrypt(obj.password);
            await repository.changePassword(userId, password);
        }
    };
};
