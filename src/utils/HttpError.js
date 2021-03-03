/* eslint-disable require-jsdoc */
'use strict';
const { StatusCodes } = require('http-status-codes');

class HttpError extends Error {
    constructor({ msg, name, statusCode, data }) {
        super(msg);
        this.name = name;
        this.statusCode = statusCode;
        this.data = data;
        Error.captureStackTrace(this, HttpError);
    }
}

class HttpNotFound extends HttpError {
    constructor(msg = 'Not Found', data) {
        super({
            msg: msg,
            name: 'HttpNotFound',
            statusCode: StatusCodes.NOT_FOUND,
            data: data
        });
    }
}

class HttpUnauthorized extends HttpError {
    constructor(msg = 'Unauthorized', data) {
        super({
            msg: msg,
            name: 'Unauthorized',
            statusCode: StatusCodes.UNAUTHORIZED,
            data: data
        });
    }
}

class HttpConflict extends HttpError {
    constructor(msg = 'Conflict', data) {
        super({
            msg,
            name: 'Conflict',
            statusCode: StatusCodes.CONFLICT,
            data
        });
    }
}

class HttpExpired extends HttpError {
    constructor(msg = 'Gone', data) {
        super({
            msg,
            name: 'Gone',
            statusCode: StatusCodes.GONE,
            data
        });
    }
}

module.exports = {
    HttpError,
    HttpNotFound,
    HttpUnauthorized,
    HttpConflict,
    HttpExpired
};
