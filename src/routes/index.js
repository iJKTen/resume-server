/* eslint-disable new-cap */
'use strict';

const router = require('express').Router();
const { authController, authValidation } = require('../api/auth');
const { userController, userValidation } = require('../api/users');
const { resumeController, resumeValidation } = require('../api/resumes');

router
    .post('/auth/login', authValidation.validateLoginSchema, authController.login)
    .post('/auth/logout', authController.logout)
    .post('/auth/forgotpassword', authValidation.forgotPassword, authController.forgotPassword)

    .get('/users/profile', [authValidation.verifyToken], userController.get)
    .get('/users/:email', userController.getByEmail)
    .get('/users/:username', userController.getByUsername)
    .post('/users', userValidation.validateRegisterSchema, userController.create)

    .get('/resumes', [authValidation.verifyToken], resumeController.index)
    .get('/resumes/:resumeId', resumeController.get)
    .post('/resumes', [
        authValidation.verifyToken,
        resumeValidation.validateResume
    ], resumeController.create)
    .put('/resumes/:resumeId', [
        authValidation.verifyToken,
        resumeValidation.validateResume
    ], resumeController.update)
    .delete('/resumes/:resumeId', [authValidation.verifyToken], resumeController.delete);

module.exports = router;
