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

module.exports = {
    validateRegisterSchema: async (req, res, next) => {
        try {
            const value = await registerSchema.validateAsync(req.body);
            req.validatedBody = value;
            return next();
        } catch (err) {
            return next(err);
        }
    }
};
