'use strict';
const resumeModel = require('./resume');

const setCurrentPlaceOfWork = (item) => {
    if (item.to.length === 0) {
        return {
            ...item,
            current: true
        };
    }
    return item;
};

module.exports = {
    index: async (userId) => {
        const result = await resumeModel.index(userId);
        if (result.length > 0) {
            return result[0].resumes;
        }
        return [];
    },
    create: async (userId, resume) => {
        const experience = resume.experience.map((item) => setCurrentPlaceOfWork(item));
        const resumeObj = {
            ...resume,
            experience
        };
        return await resumeModel.create(userId, resumeObj);
    },
    get: async (resumeId) => {
        const result = await resumeModel.get(resumeId);
        if (result && result.resumes.length > 0) {
            return result.resumes[0];
        }

        const err = new Error('Resume not found!');
        err.statusCode = 404;
        throw err;
    },
    update: async (userId, resumeId, resume) => {
        const result = await resumeModel.update(userId, resumeId, resume);
        if (result.matchedCount === 1) {
            return result.modifiedCount;
        }

        const err = new Error('Resume not found');
        err.statusCode = 404;
        throw err;
    },
    delete: async (userId, resumeId) => {
        const deletedCount = await resumeModel.delete(userId, resumeId);
        if (deletedCount === 1) {
            return deletedCount;
        }

        const err = new Error('Resume not found!');
        err.statusCode = 404;
        throw err;
    }
};
