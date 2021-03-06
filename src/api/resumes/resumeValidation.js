'use strict';

const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');

const resumeSchema = Joi.object({
    headline: Joi.string()
        .required()
        .trim(),
    resume_name: Joi.string()
        .required(),
    pronouns: Joi.string()
        .required()
        .trim(),
    name: Joi.string()
        .required()
        .trim(),
    contact: Joi.object({
        email: Joi.string()
            .required()
            .email({
                minDomainSegments: 2,
                tlds: { allow: false }
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
    links: Joi.object({
        dribble: Joi.string().allow('').uri(),
        facebook: Joi.string().allow('').uri(),
        github: Joi.string().allow('').uri(),
        twitter: Joi.string().allow('').uri(),
        website: Joi.string().allow('').uri()
    }),
    experience: Joi.array().items(
        Joi.object({
            title: Joi.string().required(),
            company: Joi.string().required(),
            responsibilities: Joi.string().required(),
            employment_type: Joi.string().required()
                .valid('Apprenticeship', 'Contract', 'Freelance', 'Full-time', 'Internship',
                    'Part-time', 'Seasonal', 'Self-employed'),
            from: Joi.date().required(),
            to: Joi.date().allow('')
                .greater(Joi.ref('from')),
            current: Joi.boolean()
        })
    ),
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
    licenses_and_certifications: Joi.array().items(
        Joi.object({
            title: Joi.string(),
            issuing_organization: Joi.string(),
            credential_expires: Joi.boolean(),
            issue_date: Joi.date(),
            expiration_date: Joi.date(),
            credential_id: Joi.string(),
            credential_url: Joi.string()
                .uri()
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
    education: Joi.array().items(
        Joi.object({
            school: Joi.string(),
            degree: Joi.string(),
            field_of_study: Joi.string(),
            grade: Joi.string().allow(''),
            from: Joi.date(),
            to: Joi.date()
                .greater(Joi.ref('from')),
            activities_and_socities: Joi.string()
                .optional()
                .allow(''),
            graduated: Joi.boolean()
        })
    ),
    side_projects: Joi.array().items(
        Joi.object({
            title: Joi.string(),
            url: Joi.string().uri(),
            summary: Joi.string(),
            year: Joi.number()
                .positive()
                .integer()
                .min(1900),
            github_url: Joi.string().uri()
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
            res.respond.withError(err, StatusCodes.BAD_REQUEST, null);
        }
    }
};
