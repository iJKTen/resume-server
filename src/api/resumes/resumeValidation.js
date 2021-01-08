'use strict';

const Joi = require('joi');

const resumeSchema = Joi.object({
    name: Joi.string()
        .required()
        .trim(),
    contact: Joi.object({
        email: Joi.string()
            .required()
            .email({
                minDomainSegments: 2
            })
            .trim(),
        phone: Joi.string()
            .required()
    }),
    location: Joi.object({
        city: Joi.string()
            .required()
            .trim(),
        state: Joi.string()
            .required()
            .trim()
    }),
    summary: Joi.string()
        .required()
        .trim(),
    whatDoYouDo: Joi.string()
        .required()
        .trim(),
    pronouns: Joi.string()
        .required()
        .trim(),
    links: Joi.object({
        website: Joi.string()
            .uri(),
        github: Joi.string()
            .uri(),
        twitter: Joi.string(),
        facebook: Joi.string()
            .uri()
    }),
    talks: Joi.array().items(
        Joi.object({
            title: Joi.string(),
            year: Joi.number()
                .positive()
                .integer()
                .min(1900),
            event: Joi.string(),
            url: Joi.string()
                .uri()
                .optional()
                .allow(''),
            summary: Joi.string()
                .optional()
                .allow('')
        })
    ),
    awards: Joi.array().items(
        Joi.object({
            title: Joi.string(),
            year: Joi.number()
                .positive()
                .integer()
                .min(1900),
            presented_by: Joi.string(),
            url: Joi.string()
                .uri()
                .optional()
                .allow(''),
            summary: Joi.string()
                .optional()
                .allow('')
        })
    ),
    experience: Joi.array().items(
        Joi.object({
            title: Joi.string(),
            description: Joi.string(),
            from: Joi.date(),
            to: Joi.date()
                .greater(Joi.ref('from')),
            current: Joi.boolean()
        })
    ),
    education: Joi.array().items(
        Joi.object({
            school: Joi.string(),
            degree: Joi.string(),
            from: Joi.date(),
            to: Joi.date()
                .greater(Joi.ref('from')),
            graduated: Joi.boolean()
        })
    )
});

module.exports = {
    validateResume: async (req, res, next) => {
        try {
            const payload = req.body;
            const validatedBody = await resumeSchema.validateAsync(payload);
            req.validatedBody = validatedBody;
            return next();
        } catch (err) {
            return next(err);
        }
    }
};
