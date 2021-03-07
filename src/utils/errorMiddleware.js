'use strict';
const HttpError = require('./HttpError');

const attachResponder = (req, res, next) => {
    res.respond = createResponder(req, res, next);
    next();
};

const createResponder = (req, res, next) => {
    const forwardError = (err, statusCode, data) => {
        const msg = err instanceof Error ? err.message : err;
        const errorToForward = new HttpError({
            name: '',
            msg: msg,
            statusCode: statusCode,
            data: data
        });
        next(errorToForward);
    };

    return {
        withError: (err, statusCode, data) => {
            return forwardError(err, statusCode, data);
        }
    };
};

module.exports = attachResponder;
