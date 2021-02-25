'use strict';

const mail = require('@sendgrid/mail');
const { config } = require('../config');

mail.setApiKey(config.smtp.API_KEY);

const sendMail = (mail, msg) => {
    mail.send(msg);
};

module.exports = {
    forgotPassword: (email, link) => {
        const msg = {
            to: email,
            from: 'jai.kirdatt+sillykeller@me.com',
            subject: 'Sending with SendGrid is Fun',
            text: `Hi, You have requested for a new password. Please copy paste this link ${link} to 
            change your password. The link will be active for 15 minutes.`,
            html: `Hi<br/>You have requested for a new password. Please click 
            <a href='${link}'>here</a> to change your password. The link will be active for 15 minutes.`
        };

        return sendMail(mail, msg);
    }
};
