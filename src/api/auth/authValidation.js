'use strict';

const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { config } = require('../../config');

const loginSchema = Joi.object({
    email: Joi.string()
        .required()
        .email({
            minDomainSegments: 2
        }),
    password: Joi.string().required()
});

const forgotPassword = Joi.object({
    email: Joi.string()
        .required()
        .email({
            minDomainSegments: 2
        })
});

const validate = async (payload, schema, next) => {
    try {
        const value = await schema.validateAsync(payload);
        return next(null, value);
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    validateLoginSchema: async (req, res, next) => {
        return await validate(req.body, loginSchema, next);
    },
    forgotPassword: async (req, res, next) => {
        return await validate(req.body, forgotPassword, next);
    },
    verifyToken: async (req, res, next) => {
        const token = req.headers['x-access-token'];
        if (!token) {
            const err = new Error('Token not found!');
            err.statusCode = 403;
            return next(err);
        }

        try {
            const decodedToken = jwt.verify(token, config.jwt.JSON_WEB_TOKEN_SECRET);
            req.userId = decodedToken.id;
            next();
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
