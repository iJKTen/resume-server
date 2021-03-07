'use strict';

const { StatusCodes } = require('http-status-codes');
const { HttpError } = require('../../utils');

const setCurrentPlaceOfWork = (item) => {
    if (item.to.length === 0) {
        return {
            ...item,
            current: true
        };
    }
    return item;
};

module.exports = (respository) => {
    return {
        index: async (userId) => {
            const result = await respository.index(userId);
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
            return await respository.create(userId, resumeObj);
        },
        get: async (resumeId) => {
            const result = await respository.get(resumeId);
            if (result && result.resumes.length > 0) {
                return result.resumes[0];
            }

            const err = new HttpError({
                name: 'Resume not found!',
                msg: `Resume with id ${resumeId} not found`,
                statusCode: StatusCodes.NOT_FOUND,
                data: null
            });
            throw err;
        },
        update: async (userId, resumeId, resume) => {
            const result = await respository.update(userId, resumeId, resume);
            if (result.matchedCount === 1) {
                return result.modifiedCount;
            }

            const err = new HttpError('Resume not found!', `Resume with id ${resumeId} not found`);
            throw err;
        },
        delete: async (userId, resumeId) => {
            const deletedCount = await respository.delete(userId, resumeId);
            if (deletedCount === 1) {
                return deletedCount;
            }

            const err = new HttpError('Resume not found!', `Resume with id ${resumeId} not found`);
            throw err;
        }
    };
};
