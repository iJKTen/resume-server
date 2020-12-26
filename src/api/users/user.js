/* eslint-disable new-cap */
'use strict';

const { ObjectId } = require('mongodb');
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
    getByEmail: async (email) => {
        const client = dbClient();
        try {
            await client.connect();
            const collection = client.db().collection(userCollection);
            return await collection.findOne({ email });
        } catch (err) {
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
    },
    update: async () => {

    },
    delete: async () => {

    }
};
