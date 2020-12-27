'use strict';

const resumeService = (resumeModel) => {
    return {
        index: async (userId) => {
            return await resumeModel.index(userId);
        },
        create: async (userId, resume) => {
            return await resumeModel.create(userId, resume);
        },
        get: async (userId, resumeId) => {
            return await resumeModel.get(userId, resumeId);
        },
        update: async (userId, resumeId, resume) => {
            return await resumeModel.update(userId, resumeId, resume);
        },
        delete: async (userId, resumeId) => {
            return await resumeModel.delete(userId, resumeId);
        }
    };
};

module.exports = resumeService;
