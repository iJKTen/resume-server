/* eslint-disable space-before-function-paren */
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
            name: 'HttpUnauthorized',
            statusCode: StatusCodes.UNAUTHORIZED,
            data: data
        });
    }
}

class HttpConflict extends HttpError {
    constructor(msg = 'Conflict', data) {
        super({
            msg,
            name: 'HttpConflict',
            statusCode: StatusCodes.CONFLICT,
            data
        });
    }
}

class HttpExpired extends HttpError {
    constructor(msg = 'Gone', data) {
        super({
            msg,
            name: 'HttpGone',
            statusCode: StatusCodes.GONE,
            data
        });
    }
}

class HttpBadRequest extends HttpError {
    constructor(msg = 'Bad Request', data) {
        super({
            msg,
            name: 'HttpBad_Request',
            statusCode: StatusCodes.BAD_REQUEST,
            data
        });
    }
}

module.exports = {
    HttpError,
    HttpNotFound,
    HttpUnauthorized,
    HttpConflict,
    HttpExpired,
    HttpBadRequest
};
