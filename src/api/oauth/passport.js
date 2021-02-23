'use strict';

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { config } = require('../../config');
const oauthService = require('./oauthService');

passport.use(new GoogleStrategy({
    clientID: config.oauth.google.CLIENT_ID,
    clientSecret: config.oauth.google.SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    console.log(accessToken, profile);
    const newUser = {
        profile_id: profile.id,
        email: profile.emails[0].value
    };
    const user = await oauthService.find_or_create(newUser);
    done(null, user);
}));

module.exports = passport;
