/* eslint-disable new-cap */
'use strict';

const router = require('express').Router();
const { authController, authValidation } = require('../api/auth');
const { userRepository } = require('../api/users');

const authRoutes = () => {
    const controller = authController(userRepository);

    router
        .post('/login', authValidation.validateLoginSchema, controller.login)
        .post('/logout', controller.logout);

    return router;
};

module.exports = authRoutes;
