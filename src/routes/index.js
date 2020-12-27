/* eslint-disable new-cap */
'use strict';

const router = require('express').Router();
const { authController, authValidation } = require('../api/auth');
const { resumeController, resumeValidation } = require('../api/resumes');

router
    .post('/auth/login', authValidation.validateLoginSchema, authController.login)
    .post('/auth/logout', authController.logout)
    .post('/auth/forgotpassword', authValidation.forgotPassword, authController.forgotPassword)
    .post('/auth/register', authValidation.validateRegisterSchema, authController.register)

    .get('/:id/resumes', [authValidation.verifyToken], resumeController.index)
    .get('/:id/resumes/:resumeId', resumeController.get)
    .post('/:id/resumes', [
        authValidation.verifyToken,
        authValidation.isCurrentUser,
        resumeValidation.validateResume
    ], resumeController.create)
    .put('/:id/resumes/:resumeId', [
        authValidation.verifyToken,
        authValidation.isCurrentUser,
        resumeValidation.validateResume
    ], resumeController.update)
    .delete('/:id/resumes/:resumeId', [
        authValidation.verifyToken,
        authValidation.isCurrentUser
    ], resumeController.delete);


module.exports = router;
