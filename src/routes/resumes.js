/* eslint-disable new-cap */
'use strict';

const router = require('express').Router();
const { resumeController, resumeValidation, resumeRepository } = require('../api/resumes');
const { authValidation } = require('../api/auth');

const resumeRoutes = () => {
    const controller = resumeController(resumeRepository);

    router
        .get('/', [authValidation.verifyToken], controller.index)
        .post('/', [
            authValidation.verifyToken,
            resumeValidation.validateResume
        ], controller.create)
        .get('/:resumeId', authValidation.verifyToken, controller.get)
        .put('/:resumeId', [
            authValidation.verifyToken,
            resumeValidation.validateResume
        ], controller.update)
        .delete('/:resumeId', [authValidation.verifyToken], controller.delete);

    return router;
};

module.exports = resumeRoutes;
