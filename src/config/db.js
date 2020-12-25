'use strict';

const { MongoClient } = require('mongodb');
const config = require('./config');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const mongoClient = () => {
    return new MongoClient(config.db.URI, options);
};

module.exports = mongoClient;
