'use strict';

const userService = require('./userService');

module.exports = (repository) => {
    const service = userService(repository);

    return {
        create: async (req, res, next) => {
            try {
                const registration = req.validatedBody;
                const user = await service.create(registration);
                return res.status(200).json(user);
            } catch (err) {
                next(err);
            }
        },
        get: async (req, res, next) => {
            try {
                const userId = req.userId;
                const user = await service.get(userId);
                return res.status(200).json(user);
            } catch (err) {
                next(err);
            }
        },
        isAvailable: async (req, res, next) => {
            try {
                const obj = req.validatedBody;
                const user = await service.isAvailable(obj);
                return res.status(200).json(user);
            } catch (err) {
                next(err);
            }
        },
        update: async (req, res, next) => {

        },
        delete: async (req, res, next) => {

        },
        forgotPassword: async (req, res, next) => {
            try {
                const user = req.validatedBody;
                service.forgotPassword(user);
                return res.status(200).json({});
            } catch (err) {
                next(err);
            }
        },
        resetPassword: async (req, res, next) => {
            try {
                const userId = req.params.userId;
                const token = req.params.token;
                const obj = req.validatedBody;
                await service.resetPassword(userId, token, obj);
                return res.status(200).json({});
            } catch (err) {
                next(err);
            }
        },
        changePassword: async (req, res, next) => {
            try {
                const userId = req.params.userId;
                const obj = req.validatedBody;
                await service.changePassword(userId, obj);
                return res.status(200).json({});
            } catch (err) {
                next(err);
            }
        }
    };
};
