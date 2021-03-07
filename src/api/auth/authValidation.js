'use strict';

const { StatusCodes } = require('http-status-codes');
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
            res.respond.withError(err, StatusCodes.BAD_REQUEST, null);
        }
    },
    forgotPassword: async (req, res, next) => {
        try {
            const value = await forgotPasswordSchema.validateAsync(req.body);
            req.validatedBody = value;
            next();
        } catch (err) {
            res.respond.withError(err, StatusCodes.BAD_REQUEST, null);
        }
    },
    verifyToken: async (req, res, next) => {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.respond.withError('Token not found', StatusCodes.UNAUTHORIZED, null);
        }

        try {
            const oauthToken = jwt.decode(token);
            if ('iss' in oauthToken) {
                const expDate = new Date(oauthToken.exp * 1000);
                const now = new Date();
                if ((now - expDate) < 0) {
                    const user = await oauthService.find_or_create(oauthToken.sub, oauthToken.email);
                    req.userId = user._id;
                    return next();
                }

                return res.respond.withError('Token expired or not found', StatusCodes.UNAUTHORIZED, null);
            }

            const decodedToken = jwt.verify(token, config.jwt.JSON_WEB_TOKEN_SECRET);
            req.userId = decodedToken.id;
            return next();
        } catch (err) {
            res.respond.withError(err, StatusCodes.UNAUTHORIZED, null);
        }
    },
    isCurrentUser: async (req, res, next) => {
        const id = req.params.id;
        if (id != req.userId) {
            return res.respond.withError('User not authorized', StatusCodes.UNAUTHORIZED, null);
        }
        next();
    }
};
