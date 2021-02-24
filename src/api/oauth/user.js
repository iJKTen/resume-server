/* eslint-disable new-cap */
'use strict';

const { dbClient } = require('../../config/');

const userCollection = 'oauth_users';

module.exports = {
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
    getByOAuthId: async (id) => {
        const client = dbClient();
        try {
            await client.connect();
            const collection = client.db().collection(userCollection);
            return await collection.findOne({ oauthId: id });
        } catch (err) {
            client.close();
        }
    }
};
