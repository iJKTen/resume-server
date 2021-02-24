'use strict';

const compression = require('compression');
const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const passport = require('passport');

const app = express();

const corsOptions = {
    origin: 'http://localhost:3001'
};

app.use(compression());
app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
    console.log('app origin', req.headers.origin);
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type'
    );
    res.header(
        'Access-Control-Allow-Origin',
        'https://silly-keller-c1e934.netlify.app'
    );
    next();
});

app.use(passport.initialize());

app.use('/api', routes);

app.use((req, res) => {
    res.status(404).send({ 'message': 'Resource not found' });
});

app.use((err, req, res, next) => {
    if (!err.statusCode) {
        err.statusCode = 500;
    }

    return res.status(err.statusCode).json({ 'message': err.message });
});

module.exports = app;
