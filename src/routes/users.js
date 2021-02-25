/* eslint-disable new-cap */
'use strict';

const router = require('express').Router();
const { userController, userValidation } = require('../api/users');
const { authValidation } = require('../api/auth');

router
    .get('/:username', [authValidation.verifyToken], userController.get)
    .post('/isAvailable', userValidation.validateIsAvailableSchema, userController.isAvailable)
    .post('/', userValidation.validateRegisterSchema, userController.create)
    .post('/forgotpassword', authValidation.forgotPassword, userController.forgotPassword)
    .post('/resetpassword', userController.resetPassword);

module.exports = router;
