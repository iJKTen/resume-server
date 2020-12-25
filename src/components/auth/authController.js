'use strict';

const user = require('../users/user');

module.exports = {
    register: async (req, res, next) => {
        try {
            const userObj = await user.create(req.body);
            return res.status(200).json(userObj);
        } catch (err) {
            next(err);
        }
    },
    login: async (req, res, next) => {

    },
    logout: async (req, res, next) => {

    },
    forgotPassword: async (req, res, next) => {

    }
};
