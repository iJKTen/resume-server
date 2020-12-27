'use strict';

const Joi = require('joi');

const resumeSchema = Joi.object({
    name: Joi.string()
        .required(),
    contact: Joi.object({
        email: Joi.string()
            .required()
            .email({
                minDomainSegments: 2
            }),
        phone: Joi.string()
            .required()
    }),
    location: Joi.object({
        city: Joi.string()
            .required(),
        state: Joi.string()
            .required()
    }),
    summary: Joi.string()
        .required(),
    links: Joi.object({
        website: Joi.string()
            .uri(),
        github: Joi.string()
            .uri(),
        twitter: Joi.string(),
        facebook: Joi.string()
            .uri()
    }),
    experience: Joi.array().items(
        Joi.object({
            title: Joi.string(),
            description: Joi.string(),
            from: Joi.date(),
            to: Joi.date(),
            current: Joi.boolean()
        })
    ),
    education: Joi.array().items(
        Joi.object({
            school: Joi.string(),
            degree: Joi.string(),
            from: Joi.date(),
            to: Joi.date(),
            graduated: Joi.boolean()
        })
    )
});

module.exports = {
    validateResume: async (req, res, next) => {
        try {
            const payload = req.body;
            const validatedSchema = await resumeSchema.validateAsync(payload);
            return next(null, validatedSchema);
        } catch (err) {
            return next(err);
        }
    }
};
