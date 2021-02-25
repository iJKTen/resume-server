/* eslint-disable new-cap */
'use strict';

const router = require('express').Router();
const { authController, authValidation } = require('../api/auth');

router
    .post('/login', authValidation.validateLoginSchema, authController.login)
    .post('/logout', authController.logout);

module.exports = router;
