'use strict';

const jwt = require('jsonwebtoken');
const { config } = require('../../config');
const bcrypt = require('bcrypt');

const userService = (userModel) => {
    return {
        login: async (login) => {
            const user = await userModel.getByEmail(login.email);
            if (!user) {
                return new Error('User not found!');
            }

            if (bcrypt.compare(user.password, login.password)) {
                const accessToken = jwt.sign(
                    {
                        id: user._id.toString(),
                        role: user.role
                    },
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
