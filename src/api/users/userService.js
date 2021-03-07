'use strict';

const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { config } = require('../../config');
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
                const err = new HttpError({
                    name: 'Email address is taken!',
                    msg: `Email address is taken`,
                    statusCode: StatusCodes.CONFLICT,
                    data: null
                });
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

            const err = new HttpError({
                name: 'User not found!',
                msg: `User not found`,
                statusCode: StatusCodes.NOT_FOUND,
                data: null
            });
            throw err;
        },
        getByEmail: async (email) => {
            const user = await repository.getByEmail(email);
            if (user) {
                return user;
            }

            const err = new HttpError({
                name: 'User not found!',
                msg: `User not found`,
                statusCode: StatusCodes.NOT_FOUND,
                data: null
            });
            throw err;
        },
        isAvailable: async (obj) => {
            const user = await repository.getByEmail(obj.email.toLowerCase());
            if (user) {
                return {
                    'email': user.email
                };
            }

            const err = new HttpError({
                name: 'User not found!',
                msg: `User not found`,
                statusCode: StatusCodes.NOT_FOUND,
                data: null
            });
            throw err;
        },
        forgotPassword: async (user) => {
            const expirationInMinutes = 15;
            const now = new Date();
            const salt = await getSalt();
            const token = await crypto.randomBytes(32).toString('hex');
            const digest = await bcrypt.hash(token, salt);
            const tokenExp = new Date(now.getTime() + (expirationInMinutes * 60000));

            const userObj = await repository.forgotPassword(user.email, token, digest, tokenExp);

            if (!userObj) {
                const err = new HttpError({
                    name: 'User not found!',
                    msg: `User not found`,
                    statusCode: StatusCodes.NOT_FOUND,
                    data: null
                });
                throw err;
            }

            const data = {
                email: user.email,
                link: `${config.origin}/resetpassword/${userObj.value._id}/${token}`
            };

            eventEmitter.emit('forgotPassword', email.forgotPassword, data);
        },
        resetPassword: async (userId, token, user) => {
            const existingUser = await repository.getById(userId);
            if (!existingUser) {
                const err = new HttpError({
                    name: 'User not found!',
                    msg: `User not found`,
                    statusCode: StatusCodes.NOT_FOUND,
                    data: null
                });
                throw err;
            }

            const passwordIsAMatch = await bcrypt.compare(token, existingUser.resetPwdDigest);

            if (!passwordIsAMatch) {
                const err = new HttpError({
                    name: 'Password reset token not found!',
                    msg: 'Password reset token not found!',
                    statusCode: StatusCodes.NOT_FOUND,
                    data: null
                });
                throw err;
            }

            const now = new Date();

            if (now > existingUser.resetPwdTokenExp) {
                const err = new HttpError({
                    name: 'Password reset token not found!',
                    msg: 'Password reset token not found!',
                    statusCode: StatusCodes.GONE,
                    data: null
                });
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
