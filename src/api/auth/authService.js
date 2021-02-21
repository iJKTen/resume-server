'use strict';
const userModel = require('../users/user');
const jwt = require('jsonwebtoken');
const { config } = require('../../config');
const bcrypt = require('bcrypt');

module.exports = {
    login: async (login) => {
        const user = await userModel.getByEmail(login.email);
        if (!user) {
            const err = new Error('User not found!');
            err.statusCode = 404;
            throw err;
        }

        const passwordIsAMatch = await bcrypt.compare(login.password, user.password);
        if (!passwordIsAMatch) {
            const err = new Error('User not found!');
            err.statusCode = 404;
            throw err;
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
