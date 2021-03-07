/* eslint-disable space-before-function-paren */
/* eslint-disable require-jsdoc */
'use strict';

class HttpError extends Error {
    constructor({ name, msg, statusCode, data }) {
        super(msg);
        this.name = name;
        this.statusCode = statusCode;
        this.data = data;
        Error.captureStackTrace(this, HttpError);
    }
}

module.exports = HttpError;
