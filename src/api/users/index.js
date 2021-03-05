'use strict';

const userController = require('./userController');
const userValidation = require('./userValidation');
const userRepository = require('./userRepository');

module.exports = {
    userController,
    userValidation,
    userRepository
};
