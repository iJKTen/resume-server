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
            return result.ops;
        } finally {
            client.close();
        }
    },
    get: async (id) => {

    },
    update: async () => {

    },
    delete: async () => {

    }
};
