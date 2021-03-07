'use strict';

const jwt = require('jsonwebtoken');
const { config } = require('../../config');
const bcrypt = require('bcrypt');
const { HttpError } = require('../../utils');
const { StatusCodes } = require('http-status-codes');

const userNotFound = () => new HttpError({
    name: '',
    msg: 'Email/Password is incorrect',
    statusCode: StatusCodes.NOT_FOUND,
    data: null
});

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
