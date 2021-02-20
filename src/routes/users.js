/* eslint-disable new-cap */
'use strict';

const router = require('express').Router();
const { userController, userValidation } = require('../api/users');
const { authValidation } = require('../api/auth');

router
    .get('/:username', [authValidation.verifyToken], userController.get)
    .head('/users/:username', userController.getByUsername)
    .post('/', userValidation.validateRegisterSchema, userController.create);

module.exports = router;
