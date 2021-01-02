'use strict';

const service = require('./userService');
const userModel = require('../users/user');

module.exports = {
    create: async (req, res, next) => {
        try {
            const registration = req.body;
            const userService = service(userModel);
            const user = await userService.create(registration);
            return res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    },
    get: async (req, res, next) => {

    },
    update: async (req, res, next) => {

    },
    delete: async (req, res, next) => {

    }
};
