'use strict';
const authService = require('./authService');

module.exports = {
    login: async (req, res, next) => {
        try {
            const login = req.validatedBody;
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
