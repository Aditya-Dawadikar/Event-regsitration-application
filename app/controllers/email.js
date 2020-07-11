const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const Team = require('../models/team');
const Volunteer = require('../models/volunteer');

exports.sendVerificationEmail = function(email, code) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.APPLICATION_EMAIL,
            pass: process.env.APPLICATION_PASSWORD
        }
    });

    const email_option = {
        from: process.env.APPLICATION_EMAIL,
        to: email,
        subject: 'verification code for password reset',
        text: "Your six digit verification code is " + code
    }

    transporter.sendMail(email_option, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                error: err
            });
        } else {
            console.log(result);
        }
    });
}

exports.sendMailToTeamsByEventId = (req, res, next) => {

    const token = req.headers.authorization;
    //const decoded = jwt.decoder(token);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.APPLICATION_EMAIL,
            pass: process.env.APPLICATION_PASSWORD
        }
    });

    //find team emails
    Team.find({ "Event.Event_id": req.params.eventId })
        .exec()
        .then(docs => {
            //extract email from database
            if (docs.length < 1) {
                return res.status(404).json({
                    message: "not found"
                });
            }
            var emailsRecipients = docs[0].Team_Leader.Leader_email + ',';
            var team_email = "";
            for (i = 1; i < docs.length; i++) {
                if (i != (docs.length - 1)) {
                    team_email = emailsRecipients.concat(docs[i].Team_Leader.Leader_email);
                    emailsRecipients = team_email;
                    team_email = emailsRecipients.concat(',');
                    emailsRecipients = team_email;
                } else {
                    team_email = emailsRecipients.concat(docs[i].Team_Leader.Leader_email);
                    emailsRecipients = team_email;
                }
            }
            if (docs.length < 2) {
                team_email = emailsRecipients;
            }

            //email details
            const email_option = {
                from: process.env.APPLICATION_EMAIL,
                to: team_email,
                subject: req.body.subject,
                text: req.body.text,
            }

            transporter.sendMail(email_option, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        error: err
                    });
                }
                res.status(200).json({
                    message: "successfully email sent",
                    emails: team_email,
                    result: result
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                error: err
            });
        });
}

exports.sendMailToAllTeams = (req, res, next) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.APPLICATION_EMAIL,
            pass: process.env.APPLICATION_PASSWORD
        }
    });

    //find team emails
    Team.find()
        .exec()
        .then(docs => {
            //extract email from database
            console.log(docs.length);
            var emailsRecipients = docs[0].Team_Leader.Leader_email + ',';
            var team_email = "";
            for (i = 1; i < docs.length; i++) {
                if (i != (docs.length - 1)) {
                    team_email = emailsRecipients.concat(docs[i].Team_Leader.Leader_email);
                    emailsRecipients = team_email;
                    team_email = emailsRecipients.concat(',');
                    emailsRecipients = team_email;
                } else {
                    team_email = emailsRecipients.concat(docs[i].Team_Leader.Leader_email);
                    emailsRecipients = team_email;
                }
            }
            if (docs.length < 2) {
                team_email = emailsRecipients;
            }
            //email details
            const email_option = {
                from: process.env.APPLICATION_EMAIL,
                to: team_email,
                subject: req.body.subject,
                text: req.body.text,
            }

            transporter.sendMail(email_option, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        error: err
                    });
                }
                res.status(200).json({
                    message: "successfully email sent",
                    emails: team_email,
                    result: result
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                error: err
            });
        });
}

exports.sendMailToAllVolunteers = (req, res, next) => {

    const token = req.headers.authorization;
    //const decoded = jwt_decoder(token);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.APPLICATION_EMAIL,
            pass: process.env.APPLICATION_PASSWORD
        }
    });

    //find team emails
    Volunteer.find()
        .exec()
        .then(docs => {

            //extract email from database
            var emailsRecipients = docs[0].Volunteer_email + ',';
            var volunteer_email = "";
            for (i = 1; i < docs.length; i++) {
                if (i != (docs.length - 1)) {
                    volunteer_email = emailsRecipients.concat(docs[i].Volunteer_email);
                    emailsRecipients = volunteer_email;
                    volunteer_email = emailsRecipients.concat(',');
                    emailsRecipients = volunteer_email;
                } else {
                    volunteer_email = emailsRecipients.concat(docs[i].Volunteer_email);
                    emailsRecipients = volunteer_email;
                }
            }
            if (docs.length === 1) {
                volunteer_email = docs[0].Volunteer_email;
            }
            //email details
            const email_option = {
                from: process.env.APPLICATION_EMAIL,
                to: volunteer_email,
                subject: req.body.subject,
                text: req.body.text,
            }

            transporter.sendMail(email_option, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                }
                res.status(200).json({
                    message: "successfully email sent",
                    emails: volunteer_email,
                    result: result
                });
            });
        })
        .catch(err => {
            res.status(404).json({
                error: err
            });
        });
}