'use strict';

const resumeService = (resumeModel) => {
    return {
        index: async (userId) => {
            const result = await resumeModel.index(userId);
            if (result.length > 0) {
                return result[0].resumes;
            }
            return [];
        },
        create: async (userId, resume) => {
            return await resumeModel.create(userId, resume);
        },
        get: async (resumeId) => {
            const result = await resumeModel.get(resumeId);
            if (result.resumes.length > 0) {
                return result.resumes[0];
            }

            return null;
        },
        update: async (userId, resumeId, resume) => {
            const result = await resumeModel.update(userId, resumeId, resume);
            if (result.matchedCount === 1) {
                return result.modifiedCount;
            }

            return -1;
        },
        delete: async (userId, resumeId) => {
            return await resumeModel.delete(userId, resumeId);
        }
    };
};

module.exports = resumeService;
