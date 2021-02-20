/* eslint-disable new-cap */
'use strict';

const router = require('express').Router();
const usersRouter = require('./users');
const authRouter = require('./auth');
const resumesRouter = require('./resumes');

router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/resumes', resumesRouter);

module.exports = router;
