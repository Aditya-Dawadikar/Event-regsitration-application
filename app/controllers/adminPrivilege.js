const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const Team = require('../models/team');
const Volunteer = require('../models/volunteer');

exports.getAllTeamEmails = (req, res, next) => {
    Team.find()
        .select('Team_details.Team_Leader.Leader_email')
        .exec()
        .then(docs => {
            var emailsRecipients = docs[0].Team_details.Team_Leader.Leader_email + ',';
            var team_email = "";
            for (i = 1; i < docs.length; i++) {
                if (i != (docs.length - 1)) {
                    team_email = emailsRecipients.concat(docs[i].Team_details.Team_Leader.Leader_email);
                    emailsRecipients = team_email;
                    team_email = emailsRecipients.concat(',');
                    emailsRecipients = team_email;
                } else {
                    team_email = emailsRecipients.concat(docs[i].Team_details.Team_Leader.Leader_email);
                    emailsRecipients = team_email;
                }
            }

            res.status(200).json({
                message: "found all emails",
                emails: emailsRecipients
            })
        })
        .catch(err => {
            res.status(404).json({
                error: err
            });
        });
}

exports.getAllTeamContacts = (req, res, next) => {
    Team.find()
        .select('Team_details.Team_Leader.Leader_phone')
        .exec()
        .then(docs => {
            /*
            //string of contacts
            var contacts = docs[0].Team_details.Team_Leader.Leader_phone + ',';
            var team_contact = "";
            for (i = 1; i < docs.length; i++) {
                if (i != (docs.length - 1)) {
                    team_contact = contacts.concat(docs[i].Team_details.Team_Leader.Leader_phone);
                    contacts = team_contact;
                    team_contact = contacts.concat(',');
                    contacts = team_contact;
                } else {
                    team_contact = contacts.concat(docs[i].Team_details.Team_Leader.Leader_phone);
                    contacts = team_contact;
                }
            }
            res.status(200).json({
                message: "found all contacts",
                contacts: team_contact
            })
            */

            //array of contacts
            const contacts = new Array();
            for (let i = 0; i < docs.length; i++) {
                contacts.push(docs[i].Team_details.Team_Leader.Leader_phone);
            }
            res.status(200).json({
                message: "found all contacts",
                contacts: contacts
            })

        })
        .catch(err => {
            res.status(404).json({
                error: err
            });
        });
}

exports.getAllVolunteerEmails = (req, res, next) => {
    Volunteer.find()
        .select('Volunteer_email')
        .exec()
        .then(docs => {
            var emailsRecipients = docs[0].Volunteer_email + ',';
            var team_email = "";
            for (i = 1; i < docs.length; i++) {
                if (i != (docs.length - 1)) {
                    team_email = emailsRecipients.concat(docs[i].Volunteer_email);
                    emailsRecipients = team_email;
                    team_email = emailsRecipients.concat(',');
                    emailsRecipients = team_email;
                } else {
                    team_email = emailsRecipients.concat(docs[i].Volunteer_email);
                    emailsRecipients = team_email;
                }
            }

            res.status(200).json({
                message: "found all emails",
                emails: emailsRecipients
            })
        })
        .catch(err => {
            res.status(404).json({
                error: err
            });
        });
}

exports.getAllVolunteerContacts = (req, res, next) => {
    Volunteer.find()
        .select('Volunteer_phone')
        .exec()
        .then(docs => {
            /*
            //string of contacts
            var contacts = docs[0].Volunteer_phone + ',';
            var team_contact = "";
            for (i = 1; i < docs.length; i++) {
                if (i != (docs.length - 1)) {
                    team_contact = contacts.concat(docs[i].Volunteer_phone);
                    contacts = team_contact;
                    team_contact = contacts.concat(',');
                    contacts = team_contact;
                } else {
                    team_contact = contacts.concat(docs[i].Volunteer_phone);
                    contacts = team_contact;
                }
            }
            res.status(200).json({
                message: "found all contacts",
                contacts: team_contact
            })
            */

            //array of contacts
            const contacts = new Array();
            for (let i = 0; i < docs.length; i++) {
                contacts.push(docs[i].Volunteer_phone);
            }
            res.status(200).json({
                message: "found all contacts",
                contacts: contacts
            })

        })
        .catch(err => {
            res.status(404).json({
                error: err
            });
        });
}