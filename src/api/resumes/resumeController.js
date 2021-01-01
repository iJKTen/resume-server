'use strict';

const service = require('./resumeService');
const resumeModel = require('./resume');

const resumeService = service(resumeModel);

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
            const userId = req.userId;
            const resumeId = req.params.resumeId;
            const resume = await resumeService.get(userId, resumeId);
            return res.status(200).json(resume);
        } catch (err) {
            err.statusCode = 404;
            return next(err);
        }
    },
    create: async (req, res, next) => {
        try {
            const userId = req.userId;
            const resumeJson = req.body;
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
            const resumeJson = req.body;
            const resume = await resumeService.update(userId, resumeId, resumeJson);
            return res.status(200).json(resume);
        } catch (err) {
            return next(err);
        }
    },
    delete: async (req, res, next) => {
        try {
            const userId = req.userId;
            const resumeId = req.params.resumeId;
            const resume = await resumeService.delete(userId, resumeId);
            return res.status(200).json(resume);
        } catch (err) {
            return next(err);
        }
    }
};
