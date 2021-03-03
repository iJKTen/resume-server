'use strict';

const HttpError = require('./HttpError');
const attachResponder = require('./errorMiddleware');

module.exports = {
    HttpError,
    attachResponder
};
