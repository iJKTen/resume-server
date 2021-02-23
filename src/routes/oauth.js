/* eslint-disable new-cap */
'use strict';

const router = require('express').Router();
const passport = require('../api/oauth');

router
    .get('/', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }))
    .get('/callback', passport.authenticate('google'));

module.exports = router;
