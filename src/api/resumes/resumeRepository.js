/* eslint-disable new-cap */
'use strict';

const { ObjectId } = require('mongodb');
const { dbClient } = require('../../config');

const resumeCollection = 'resumes';

const resumeQuery = (userId, resumeId) => ({
    'userId': ObjectId(userId),
    'resumes._id': ObjectId(resumeId)
});

module.exports = {
    index: async (userId) => {
        const client = dbClient();
        try {
            const query = {
                userId: ObjectId(userId)
            };
            const options = {
                projection: { 'resumes._id': 1, 'resumes.resume_name': 1 }
            };

            await client.connect();
            const collection = client.db().collection(resumeCollection);
            const result = await collection.find(query, options).toArray();
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
                    'resumes': {
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
    get: async (resumeId) => {
        const client = dbClient();
        try {
            const query = {
                'resumes._id': ObjectId(resumeId)
            };

            // const options = { 'resumes.$': 1 };

            await client.connect();
            const collection = client.db().collection(resumeCollection);
            const result = await collection.findOne(query, {
                projection: { 'resumes.$': 1 }
            });
            return result;
        } finally {
            client.close();
        }
    },
    update: async (userId, resumeId, resume) => {
        const client = dbClient();
        try {
            const query = resumeQuery(userId, resumeId);
            const resumeDoc = {
                $set: {
                    'resumes.$': {
                        _id: ObjectId(resumeId),
                        ...resume
                    }
                }
            };
            await client.connect();
            const collection = client.db().collection(resumeCollection);
            const result = await collection.updateOne(query, resumeDoc);
            return result;
        } finally {
            client.close();
        }
    },
    delete: async (userId, resumeId) => {
        const client = dbClient();
        try {
            const query = resumeQuery(userId, resumeId);
            await client.connect();
            const collection = client.db().collection(resumeCollection);
            const result = await collection.deleteOne(query);
            return result.deletedCount;
        } finally {
            client.close();
        }
    }
};
