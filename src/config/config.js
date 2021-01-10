'use strict';
require('dotenv').config();
const configSchema = require('./configSchema');

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

(async () => {
    try {
        await configSchema.validateAsync(config);
    } catch (err) {
        throw Error(err.message);
    }
})();

module.exports = config;
