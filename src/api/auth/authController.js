'use strict';

const service = require('./authService');
const userModel = require('../users/user');

module.exports = {
    login: async (req, res, next) => {
        try {
            const login = req.validatedBody;
            const authService = service(userModel);
            const user = await authService.login(login);
            return res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    },
    logout: async (req, res, next) => {

    },
    forgotPassword: async (req, res, next) => {

    }
};
