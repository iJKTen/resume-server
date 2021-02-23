/* eslint-disable new-cap */
'use strict';

const { ObjectId } = require('mongodb');
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
    getById: async (id) => {
        const client = dbClient();
        try {
            await client.connect();
            const collection = client.db().collection(userCollection);
            return await collection.findOne({ _id: ObjectId(id) });
        } catch (err) {
            client.close();
        }
    }
};
