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
            if (resume === null) {
                const err = new Error('Resume not found!');
                err.statusCode = 404;
                return next(err);
            }
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
            const result = await resumeService.update(userId, resumeId, resumeJson);
            if (result === -1) {
                const err = new Error('Resume not found');
                err.statusCode = 404;
                return next(err);
            }

            return res.sendStatus(200);
        } catch (err) {
            return next(err);
        }
    },
    delete: async (req, res, next) => {
        try {
            const userId = req.userId;
            const resumeId = req.params.resumeId;
            const deletedCount = await resumeService.delete(userId, resumeId);
            if (deletedCount === 1) {
                return res.sendStatus(204);
            }

            const err = new Error('Resume not found!');
            err.statusCode = 404;
            next(err);
        } catch (err) {
            return next(err);
        }
    }
};
