'use strict';

const jwt = require('jsonwebtoken');
const { config } = require('../../config');

const userService = (userModel) => {
    return {
        register: async (registration) => {
            return await userModel.create(registration);
        },
        login: async (login) => {
            const user = await userModel.login(login);
            if (!user) {
                return new Error('User not found!');
            }
            const accessToken = jwt.sign(
                {
                    id: user.id
                },
                config.jwt.JSON_WEB_TOKEN_SECRET,
                { expiresIn: config.jwt.JSON_WEB_TOKEN_EXPIRATION });

            return {
                id: user.id,
                email: user.email,
                accessToken: accessToken
            };
        }
    };
};

module.exports = userService;
