'use strict';

const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { config } = require('../../config');
const oauthService = require('../oauth');

const loginSchema = Joi.object({
    email: Joi.string()
        .required()
        .lowercase()
        .email({
            minDomainSegments: 2
        }),
    password: Joi.string().required()
});

const forgotPasswordSchema = Joi.object({
    email: Joi.string()
        .required()
        .email({
            minDomainSegments: 2
        })
});

module.exports = {
    validateLoginSchema: async (req, res, next) => {
        try {
            const value = await loginSchema.validateAsync(req.body);
            req.validatedBody = value;
            next();
        } catch (err) {
            next(err);
        }
    },
    forgotPassword: async (req, res, next) => {
        try {
            const value = await forgotPasswordSchema.validateAsync(req.body);
            req.validatedBody = value;
            next();
        } catch (err) {
            next(err);
        }
    },
    verifyToken: async (req, res, next) => {
        const token = req.headers['x-access-token'];
        if (!token) {
            const err = new Error('Token not found!');
            err.statusCode = 403;
            return next(err);
        }

        try {
            const oauthToken = jwt.decode(token);
            console.log(oauthToken);
            if ('iss' in oauthToken) {
                const expDate = new Date(oauthToken.exp * 1000);
                const now = new Date();
                if ((now - expDate) < 0) {
                    const user = await oauthService.find_or_create(oauthToken.sub, oauthToken.email);
                    req.userId = user._id;
                    return next();
                }

                const err = new Error();
                err.statusCode = 401;
                return next(err);
            }

            const decodedToken = jwt.verify(token, config.jwt.JSON_WEB_TOKEN_SECRET);
            req.userId = decodedToken.id;
            return next();
        } catch (err) {
            err.statusCode = 401;
            return next(err);
        }
    },
    isCurrentUser: async (req, res, next) => {
        const id = req.params.id;
        if (id != req.userId) {
            const err = new Error('User not authorized');
            err.statusCode = 401;
            return next(err);
        }
        next();
    }
};
