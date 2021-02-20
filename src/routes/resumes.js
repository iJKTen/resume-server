/* eslint-disable new-cap */
'use strict';

const router = require('express').Router();
const { resumeController, resumeValidation } = require('../api/resumes');
const { authValidation } = require('../api/auth');

router
    .get('/', [authValidation.verifyToken], resumeController.index)
    .post('/', [
        authValidation.verifyToken,
        resumeValidation.validateResume
    ], resumeController.create)
    .get('/:resumeId', resumeController.get)
    .put('/:resumeId', [
        authValidation.verifyToken,
        resumeValidation.validateResume
    ], resumeController.update)
    .delete('/:resumeId', [authValidation.verifyToken], resumeController.delete);

module.exports = router;
