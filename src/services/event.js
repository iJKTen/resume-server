'use strict';

const { EventEmitter } = require('events');

const eventEmitter = new EventEmitter();

eventEmitter.on('forgotPassword', (fn, data) => {
    fn(data.email, data.link);
});

module.exports = eventEmitter;
