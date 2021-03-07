'use strict';

const { StatusCodes } = require('http-status-codes');
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

const resetPasswordSchema = Joi.object({
    password: Joi.string()
        .required(),
    password_confirmation: Joi.ref('password')
});

module.exports = {
    validateRegisterSchema: async (req, res, next) => {
        try {
            const value = await registerSchema.validateAsync(req.body);
            req.validatedBody = value;
            return next();
        } catch (err) {
            res.respond.withError(err, StatusCodes.BAD_REQUEST, null);
        }
    },
    validateIsAvailableSchema: async (req, res, next) => {
        try {
            const value = await isAvailableSchema.validateAsync(req.body);
            req.validatedBody = value;
            return next();
        } catch (err) {
            res.respond.withError(err, StatusCodes.BAD_REQUEST, null);
        }
    },
    validateResetPasswordSchema: async (req, res, next) => {
        try {
            const value = await resetPasswordSchema.validateAsync(req.body);
            req.validatedBody = value;
            return next();
        } catch (err) {
            res.respond.withError(err, StatusCodes.BAD_REQUEST, null);
        }
    }
};
