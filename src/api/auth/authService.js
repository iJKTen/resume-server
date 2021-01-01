'use strict';

const jwt = require('jsonwebtoken');
const { config } = require('../../config');
const bcrypt = require('bcrypt');

const encrypt = async (password) => {
    const salt = await bcrypt.genSalt(config.crpyto.BCRYPT_WORK_FACTOR);
    return await bcrypt.hash(password, salt);
};

const userService = (userModel) => {
    return {
        register: async (registration) => {
            const registrationUser = {
                email: registration.email,
                password: await encrypt(registration.password)
            };
            const user = await userModel.create(registrationUser);
            return {
                _id: user._id,
                email: user.email
            };
        },
        login: async (login) => {
            const user = await userModel.getByEmail(login.email);
            if (!user) {
                return new Error('User not found!');
            }

            if (bcrypt.compare(user.password, login.password)) {
                const accessToken = jwt.sign(
                    { id: user._id.toString() },
                    config.jwt.JSON_WEB_TOKEN_SECRET,
                    { expiresIn: config.jwt.JSON_WEB_TOKEN_EXPIRATION }
                );

                return {
                    id: user.id,
                    email: user.email,
                    accessToken: accessToken
                };
            }
            return new Error('User not found!');
        }
    };
};

module.exports = userService;
