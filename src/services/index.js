'use strict';

const eventEmitter = require('./event');
const forgotPassword = require('./email');

module.exports = {
    eventEmitter,
    'forgotPassword': forgotPassword.forgotPassword
};
