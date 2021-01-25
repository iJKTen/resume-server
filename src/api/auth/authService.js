'use strict';

const jwt = require('jsonwebtoken');
const { config } = require('../../config');
const bcrypt = require('bcrypt');

const userService = (userModel) => {
    return {
        login: async (login) => {
            const user = await userModel.getByEmail(login.email);
            if (!user) {
                const err = new Error('User not found!');
                err.statusCode = 404;
                throw err;
            }

            if (await bcrypt.compare(login.password, user.password)) {
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
            throw new Error('User not found!');
        }
    };
};

module.exports = userService;
