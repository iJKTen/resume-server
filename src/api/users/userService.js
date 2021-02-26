'use strict';
const userModel = require('../users/user');
const { config } = require('../../config');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { eventEmitter, ...email } = require('../../services');

const getSalt = async () => await bcrypt.genSalt(config.crpyto.BCRYPT_WORK_FACTOR);

const encrypt = async (password) => {
    const salt = await getSalt();
    return await bcrypt.hash(password, salt);
};

module.exports = {
    create: async (registration) => {
        const existingUser = await userModel.getByEmail(registration.email);
        if (existingUser) {
            const err = new Error('Email address is taken');
            err.statusCode = 409;
            return err;
        }

        const { password_confirmation, ...registrationUser } = {
            ...registration,
            password: await encrypt(registration.password)
        };

        const user = await userModel.create(registrationUser);

        return {
            _id: user._id,
            email: user.email
        };
    },
    get: async (userId) => {
        const user = await userModel.getById(userId);
        if (user) {
            return user;
        }
        return null;
    },
    isAvailable: async (obj) => {
        const user = await userModel.getByEmail(obj.email.toLowerCase());
        if (user) {
            return {
                'email': user.email
            };
        }
        return null;
    },
    forgotPassword: async (user) => {
        const expirationInMinutes = 15;
        const now = new Date();
        const salt = await getSalt();
        const token = await crypto.randomBytes(32).toString('hex');
        const digest = await bcrypt.hash(token, salt);
        const tokenExp = new Date(now.getTime() + (expirationInMinutes * 60000));

        const userObj = await userModel.forgotPassword(user.email, token, digest, tokenExp);
        const data = {
            email: user.email,
            link: `${config.origin}/resetpassword/${userObj.value._id}/${token}`
        };

        eventEmitter.emit('forgotPassword', email.forgotPassword, data);
    },
    resetPassword: async (userId, token, user) => {
        const existingUser = await userModel.getById(userId);
        const passwordIsAMatch = await bcrypt.compare(token, existingUser.resetPwdDigest);

        if (!passwordIsAMatch) {
            const err = new Error('Password reset token not found');
            err.statusCode = 404;
            throw err;
        }

        const now = new Date();

        if (now > existingUser.resetPwdTokenExp) {
            const err = new Error('Password link expired');
            err.statusCode = 500;
            throw err;
        }

        const newPassword = await encrypt(user.password);
        await userModel.changePassword(userId, newPassword);
    }
};
