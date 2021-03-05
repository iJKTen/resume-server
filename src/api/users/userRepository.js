/* eslint-disable new-cap */
'use strict';

const { ObjectId } = require('mongodb');
const { dbClient } = require('../../config');

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
        } finally {
            client.close();
        }
    },
    update: async () => {

    },
    delete: async () => {

    },
    forgotPassword: async (email, token, digest, expiration) => {
        const client = dbClient();
        try {
            await client.connect();
            const collection = client.db().collection(userCollection);
            return await collection.findOneAndUpdate({ email }, {
                $set: {
                    resetPwdToken: token,
                    resetPwdTokenExp: expiration,
                    resetPwdDigest: digest
                }
            }, {
                projection: {
                    '_id': 1,
                    'resetPwdToken': 1,
                    'resetPwdTokenExp': 1,
                    'resetPwdDigest': 1
                }
            });
        } finally {
            client.close();
        }
    },
    changePassword: async (id, password) => {
        const client = dbClient();
        try {
            await client.connect();
            const collection = client.db().collection(userCollection);
            return await collection.findOneAndUpdate({ _id: ObjectId(id) }, {
                $set: {
                    password: password,
                    resetPwdDigest: '',
                    resetPwdToken: '',
                    resetPwdTokenExp: ''
                }
            });
        } finally {
            client.close();
        }
    }
};
