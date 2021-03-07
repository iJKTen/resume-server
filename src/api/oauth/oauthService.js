'use strict';
const oauthRepository = require('./oauthRepository');

const create = async (newUser) => {
    const user = await oauthRepository.create(newUser);

    return {
        _id: user._id.toString(),
        email: user.email
    };
};

const get = async (id) => {
    const user = await oauthRepository.getByOAuthId(id);
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
