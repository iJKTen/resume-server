'use strict';

const { dbClient } = require('../../config/');

const userCollection = 'users';

module.exports = {
    index: async () => {

    },
    create: async (user) => {
        const client = dbClient();
        try {
            await client.connect();
            const collection = client.db().collection(userCollection);
            const result = await collection.insertOne(user);
            return result.ops[0];
        } finally {
            client.close();
        }
    },
    get: async (email) => {
        const client = dbClient();
        try {
            await client.connect();
            const collection = client.db().collection(userCollection);
            return await collection.findOne({ email });
        } catch (err) {
            client.close();
        }
    },
    update: async () => {

    },
    delete: async () => {

    },
    changePassword: async () => {

    }
};
