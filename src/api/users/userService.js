'use strict';

const { config } = require('../../config');
const bcrypt = require('bcrypt');

const userService = (userModel) => {
    return {
        create: async (registration) => {
            const existingUser = await userModel.getByEmail(registration.email);
            if (existingUser) {
                const err = new Error('Email address is taken');
                err.statusCode = 409;
                return err;
            }

            const encrypt = async (password) => {
                const salt = await bcrypt.genSalt(config.crpyto.BCRYPT_WORK_FACTOR);
                return await bcrypt.hash(password, salt);
            };

            const registrationUser = {
                email: registration.email,
                password: await encrypt(registration.password),
                role: registration.role
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
        getByEmail: async (email) => {
            const user = await userModel.getByEmail(email.toLowerCase());
            if (user) {
                return {
                    'email': user.email
                };
            }
            return null;
        }
    };
};

module.exports = userService;
