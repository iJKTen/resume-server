/* eslint-disable new-cap */
'use strict';

const { ObjectId } = require('mongodb');
const { dbClient } = require('../../config/');

const resumeCollection = 'resumes';

module.exports = {
    index: async (userId) => {
        const client = dbClient();
        try {
            const query = {
                userId: ObjectId(userId)
            };
            await client.connect();
            const collection = client.db().collection(resumeCollection);
            const result = await collection.find(query).toArray();
            return result;
        } finally {
            client.close();
        }
    },
    create: async (userId, resume) => {
        const client = dbClient();
        try {
            const filter = {
                'userId': ObjectId(userId)
            };
            const options = {
                upsert: true
            };
            const resumeDoc = {
                $addToSet: {
                    'resume': {
                        _id: new ObjectId(),
                        ...resume
                    }
                }
            };
            await client.connect();
            const collection = client.db().collection(resumeCollection);
            return await collection.updateOne(filter, resumeDoc, options);
        } finally {
            client.close();
        }
    },
    get: async (userId, resumeId) => {
        const client = dbClient();
        try {
            const query = {
                userId,
                resumes: {
                    resumeId
                }
            };
            await client.connect();
            const collection = client.db().collection(resumeCollection);
            const result = await collection.find(query);
            return result.ops[0];
        } finally {
            client.close();
        }
    },
    update: async (userId, resumeId, resume) => {
        const client = dbClient();
        try {
            const query = {
                userId,
                resumes: {
                    resumeId
                }
            };
            await client.connect();
            const collection = client.db().collection(resumeCollection);
            const result = await collection.replaceOne(query, resume);
            return result.ops[0];
        } finally {
            client.close();
        }
    },
    delete: async (userId, resumeId) => {
        const client = dbClient();
        try {
            const query = {
                userId,
                resumes: {
                    resumeId
                }
            };
            await client.connect();
            const collection = client.db().collection(resumeCollection);
            const result = await collection.deleteOne(query);
            return result.ops;
        } finally {
            client.close();
        }
    }
};
