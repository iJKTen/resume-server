'use strict';

const Joi = require('joi');

const registerSchema = Joi.object({
    email: Joi.string()
        .required()
        .lowercase()
        .email({
            minDomainSegments: 2
        }),
    password: Joi.string()
        .required(),
    password_confirmation: Joi.ref('password'),
    role: Joi.string()
        .required()
});

const isAvailableSchema = Joi.object({
    email: Joi.string()
        .lowercase()
        .email({
            minDomainSegments: 2
        })
});

module.exports = {
    validateRegisterSchema: async (req, res, next) => {
        try {
            const value = await registerSchema.validateAsync(req.body);
            req.validatedBody = value;
            return next();
        } catch (err) {
            return next(err);
        }
    },
    validateIsAvailableSchema: async (req, res, next) => {
        try {
            const value = await isAvailableSchema.validateAsync(req.body);
            req.validatedBody = value;
            return next();
        } catch (err) {
            return next(err);
        }
    }
};
