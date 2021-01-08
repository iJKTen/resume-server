'use strict';

const service = require('./userService');
const userModel = require('../users/user');

module.exports = {
    create: async (req, res, next) => {
        try {
            const registration = req.validatedBody;
            const userService = service(userModel);
            const user = await userService.create(registration);
            if (user instanceof Error) {
                return next(user);
            }
            return res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    },
    get: async (req, res, next) => {
        try {
            const userId = req.userId;
            const userService = service(userModel);
            const user = await userService.get(userId);
            if (!user) {
                const err = new Error('User not found');
                err.statusCode = 404;
                return next(err);
            }
            return res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    },
    getByEmail: async (req, res, next) => {
        try {
            const email = req.params.email;
            const userService = service(userModel);
            const user = await userService.getByEmail(email);
            if (!user) {
                const err = new Error('User not found');
                err.statusCode = 404;
                return next(err);
            }
            return res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    },
    update: async (req, res, next) => {

    },
    delete: async (req, res, next) => {

    }
};
