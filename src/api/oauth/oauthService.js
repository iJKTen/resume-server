'use strict';
const userModel = require('./user');

const create = async (newUser) => {
    const user = await userModel.create(newUser);

    return {
        _id: user._id.toString(),
        email: user.email
    };
};

const get = async (id) => {
    const user = await userModel.getByOAuthId(id);
    if (user) {
        return user;
    }
    return null;
};

module.exports = {
    find_or_create: async (userId, email) => {
        const oauthUser = {
            oauthId: userId,
            email: email
        };
        const existingUser = await get(userId);
        if (existingUser === null) {
            return create(oauthUser);
        }

        return existingUser;
    }
};
