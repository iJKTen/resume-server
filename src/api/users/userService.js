'use strict';

const { config } = require('../../config');
const bcrypt = require('bcrypt');

const encrypt = async (password) => {
    const salt = await bcrypt.genSalt(config.crpyto.BCRYPT_WORK_FACTOR);
    return await bcrypt.hash(password, salt);
};

const userService = (userModel) => {
    return {
        create: async (registration) => {
            const registrationUser = {
                email: registration.email,
                password: await encrypt(registration.password),
                role: registration.role
            };
            const user = await userModel.create(registrationUser);
            return {
                _id: user._id,
                email: user.email
            };
        }
    };
};

module.exports = userService;
