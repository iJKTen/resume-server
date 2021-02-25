'use strict';

const { EventEmitter } = require('events');

const timerEventEmitter = new EventEmitter();

timerEventEmitter.on('forgotPassword', (fn, data) => {
    fn(data.email, data.link);
});

module.exports = timerEventEmitter;
