'use strict';
const Joi = require('joi');

const configSchema = Joi.object({
    db: Joi.object({
        URI: Joi.string()
            .uri()
            .required()
            .error((errors) => new Error('"URI" needs to be the URL to a valid mongo database.'))
    }),
    crpyto: Joi.object({
        BCRYPT_WORK_FACTOR: Joi.number()
            .integer()
            .required()
            .min(12)
            .error((errors) => new Error('"BCRYPT_WORK_FACTOR" needs to be an integer greater than 12.'))
    }),
    jwt: Joi.object({
        JSON_WEB_TOKEN_SECRET: Joi.string()
            .required()
            .error((errors) => new Error('"JSON_WEB_TOKEN_SECRET" needs to a random string.')),
        JSON_WEB_TOKEN_EXPIRATION: Joi.number()
            .integer()
            .required()
            .error((errors) => new Error('"JSON_WEB_TOKEN_EXPIRATION" needs to be a number in seconds.'))
    }),
    origin: Joi.string()
        .required()
        .error((errors) => new Error('"CLIENT_ORIGIN" needs to be the URL where your react app is running')),
    smtp: Joi.object({
        API_KEY: Joi.string()
            .required()
            .error((errors) => new Error('"EMAIL_SERVICE_API_KEY" not found.'))
    })
});

module.exports = configSchema;
