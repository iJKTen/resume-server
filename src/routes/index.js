/* eslint-disable new-cap */
'use strict';

const router = require('express').Router();
const usersRoutes = require('./users');
const authRoutes = require('./auth');
const resumesRoutes = require('./resumes');

router.use('/users', usersRoutes());
router.use('/auth', authRoutes());
router.use('/resumes', resumesRoutes());
module.exports = router;
