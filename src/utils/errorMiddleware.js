'use strict';
const HttpError = require('./HttpError');

const attachResponder = (req, res, next) => {
    res.respond = createResponder(req, res, next);
    next();
};

const createResponder = (req, res, next) => {
    const forwardError = (err, ErrorClass = Error, data) => {
        const msg = err instanceof Error ? err.message : err;
        const errorToForward = new ErrorClass(msg, data);
        next(errorToForward);
    };

    return {
        notFound: (err, data) => {
            return forwardError(err, HttpError.HttpNotFound, data);
        },
        unauthorized: (err, data) => {
            return forwardError(err, HttpError.HttpUnauthorized, data);
        },
        expired: (err, data) => {
            return forwardError(err, HttpError.HttpExpired, data);
        },
        jwtTokenNotFound: (err, data) => {
            return forwardError(err, HttpError.HttpUnauthorized, data);
        },
        badRequest: (err, data) => {
            return forwardError(err, HttpError.HttpBadRequest, data);
        }
    };
};

module.exports = attachResponder;
