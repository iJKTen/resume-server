/* eslint-disable new-cap */
'use strict';

const router = require('express').Router();
const { userController, userValidation, userRepository } = require('../api/users');
const { authValidation } = require('../api/auth');

const controller = userController(userRepository);

router
    .get('/:username', [authValidation.verifyToken], controller.get)
    .post('/isAvailable', userValidation.validateIsAvailableSchema, controller.isAvailable)
    .post('/', userValidation.validateRegisterSchema, controller.create)
    .post('/forgotpassword', authValidation.forgotPassword, controller.forgotPassword)
    .post('/resetpassword/:userId/:token', userValidation.validateResetPasswordSchema, controller.resetPassword)
    .post('/changepassword',
        [authValidation.verifyToken, userValidation.validateResetPasswordSchema],
        controller.changePassword);

module.exports = router;
