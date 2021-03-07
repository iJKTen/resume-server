'use strict';
const authService = require('./authService');

module.exports = (repository) => {
    const service = authService(repository);

    return {
        login: async (req, res, next) => {
            try {
                const login = req.validatedBody;
                const user = await service.login(login);
                return res.status(200).json(user);
            } catch (err) {
                next(err);
            }
        },
        logout: async (req, res, next) => {

        }
    };
};
