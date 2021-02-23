'use strict';
const userModel = require('./user');

const create = async (newUser) => {
    const user = await userModel.create(newUser);

    return {
        _id: user._id,
        email: user.email
    };
};

const get = async (id) => {
    const user = await userModel.getById(id);
    if (user) {
        return user;
    }
    return null;
};

module.exports = {
    find_or_create: async (newUser) => {
        const existingUser = await get(newUser.id);
        if (existingUser === null) {
            return create(newUser);
        }

        return existingUser;
    }
};
