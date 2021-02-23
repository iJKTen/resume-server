/* eslint-disable new-cap */
'use strict';

const router = require('express').Router();
const usersRouter = require('./users');
const authRouter = require('./auth');
const resumesRouter = require('./resumes');
const oauthGoogleRouter = require('./oauth');

router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/resumes', resumesRouter);
router.use('/oauth/google', oauthGoogleRouter);

module.exports = router;
