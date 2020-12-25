'use strict';

const userService = (userModel) => {
    return {
        register: async (registration) => {
            return await userModel.create(registration);
        }
    };
};

module.exports = userService;
