'use strict';

const resumeService = require('./resumeService');

module.exports = {
    index: async (req, res, next) => {
        try {
            const userId = req.userId;
            const resumes = await resumeService.index(userId);
            return res.status(200).json(resumes);
        } catch (err) {
            return next(err);
        }
    },
    get: async (req, res, next) => {
        try {
            const resumeId = req.params.resumeId;
            const resume = await resumeService.get(resumeId);
            return res.status(200).json(resume);
        } catch (err) {
            err.statusCode = 404;
            return next(err);
        }
    },
    create: async (req, res, next) => {
        try {
            const userId = req.userId;
            const resumeJson = req.validatedBody;
            await resumeService.create(userId, resumeJson);
            return res.sendStatus(201);
        } catch (err) {
            return next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            const userId = req.userId;
            const resumeId = req.params.resumeId;
            const resumeJson = req.validatedBody;
            await resumeService.update(userId, resumeId, resumeJson);
            return res.sendStatus(201);
        } catch (err) {
            return next(err);
        }
    },
    delete: async (req, res, next) => {
        try {
            const userId = req.userId;
            const resumeId = req.params.resumeId;
            await resumeService.delete(userId, resumeId);
            return res.sendStatus(204);
        } catch (err) {
            return next(err);
        }
    }
};
