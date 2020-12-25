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
    password_confirmation: Joi.ref('password')
});

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
    validateRegisterSchema: async (req, res, next) => {
        return await validate(req.body, registerSchema, next);
    },
    validateLoginSchema: async (req, res, next) => {
        return await validate(req.body, loginSchema, next);
    },
    forgotPassword: async (req, res, next) => {
        return await validate(req.body, forgotPassword, next);
    }
};
