'use strict';
require('dotenv').config();
const Joi = require('joi');

// TODO: Validate with JOI

const config = {};

config.db = {
    'URI': process.env.MONGO_URI
};

config.crpyto = {
    'BCRYPT_WORK_FACTOR': parseInt(process.env.BCRYPT_WORK_FACTOR)
};

config.jwt = {
    'JSON_WEB_TOKEN_SECRET': process.env.JSON_WEB_TOKEN_SECRET,
    'JSON_WEB_TOKEN_EXPIRATION': parseInt(process.env.JSON_WEB_TOKEN_EXPIRATION)
};

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
    })
});

(async () => {
    try {
        await configSchema.validateAsync(config);
    } catch (err) {
        throw Error(err.message);
    }
})();

module.exports = config;
