'use strict';

const jwt = require('jsonwebtoken');
const { config } = require('../../config');
const bcrypt = require('bcrypt');
const { HttpError } = require('../../utils');

const userNotFound = () => new HttpError.HttpNotFound('Email/Password is incorrect', null);

module.exports = (repository) => {
    return {
        login: async (login) => {
            const user = await repository.getByEmail(login.email);
            if (!user) {
                throw userNotFound();
            }

            const passwordIsAMatch = await bcrypt.compare(login.password, user.password);
            if (!passwordIsAMatch) {
                throw userNotFound();
            }

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
    };
};
