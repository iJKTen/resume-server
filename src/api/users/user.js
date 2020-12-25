'use strict';

const { config, dbClient } = require('../../config/');
const bcrypt = require('bcrypt');

const userCollection = 'users';

const encrypt = async (password) => {
    const salt = await bcrypt.genSalt(config.crpyto.BCRYPT_WORK_FACTOR);
    return await bcrypt.hash(password, salt);
};

const replacePwd = (user, password) => {
    return {
        ...user,
        password
    };
};

module.exports = {
    index: async () => {

    },
    create: async (user) => {
        const client = dbClient();
        try {
            await client.connect();
            const collection = client.db().collection(userCollection);
            const encryptedPwd = await encrypt(user.password);
            const { password_confirmation, ...aUser } = user;
            const newUser = replacePwd(aUser, encryptedPwd);
            const result = await collection.insertOne(newUser);
            const { password, ...newResult } = result.ops[0];
            return newResult;
        } finally {
            client.close();
        }
    },
    get: async (email) => {

    },
    update: async () => {

    },
    delete: async () => {

    },
    changePassword: async () => {

    },
    login: async (user) => {
        const client = dbClient();
        try {
            await client.connect();
            const collection = client.db().collection(userCollection);
            const dbUser = await collection.findOne({
                email: user.email
            });
            if (bcrypt.compare(user.password, dbUser.password)) {
                const { password, ...foundUser } = dbUser;
                return foundUser;
            }
            return null;
        } catch (err) {
            client.close();
        }
    }
};
