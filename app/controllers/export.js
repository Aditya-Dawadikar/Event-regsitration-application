const { google } = require('googleapis');
const keys = require('../../keys.json');

const Volunteer = require('../models/volunteer');
const Team = require('../models/team');
const Event = require('../models/event');

const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key, ['https://www.googleapis.com/auth/spreadsheets']
);

exports.exportVolunteers = (req, res) => {
    Volunteer.find()
        .exec()
        .then(docs => {
            let data = new Array();
            for (let i = 0; i < docs.length; i++) {
                let row = [
                    docs[i]._id,
                    docs[i].Volunteer_name,
                    docs[i].Volunteer_email,
                    docs[i].Volunteer_phone,
                    docs[i].Volunteer_class,
                    docs[i].Volunteer_division
                ]
                data.push(row);
            }
            client.authorize(function(err, tokens) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    console.log('connected');
                    gsrun(client);
                }
            });

            async function gsrun(cl) {
                const gsapi = google.sheets({ version: 'v4', auth: cl });
                const updateOps = {
                    spreadsheetId: req.body.spreadsheetId,
                    range: 'Volunteers!A2',
                    valueInputOption: 'USER_ENTERED',
                    resource: { values: data }
                };
                let response = await gsapi.spreadsheets.values.update(updateOps);
                console.log(response);
            }
            console.log(data);
            res.status(200).json({
                message: "exporting data"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
}


exports.exportTeams = (req, res) => {
    Team.find()
        .exec()
        .then(docs => {
            let data = new Array();
            for (let i = 0; i < docs.length; i++) {
                let row = [
                    docs[i]._id,
                    docs[i].Team_details.Team_Leader.Leader_name,
                    docs[i].Team_details.Team_Leader.Leader_email,
                    docs[i].Team_details.Team_Leader.Leader_phone,
                    docs[i].Team_details.Team_Leader.Alternative_phone,
                    docs[i].Team_details.Event.Event_name,
                    docs[i].Team_details.Event.Event_id,
                    docs[i].Team_details.Payment.payment_method,
                    docs[i].Team_details.Payment.payment_status,
                    docs[i].Team_details.Team_name,
                    docs[i].Team_details.Team_Member_count,
                    docs[i].Team_details.Registration_date
                ]
                data.push(row);
            }
            client.authorize(function(err, tokens) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    console.log('connected');
                    gsrun(client);
                }
            });

            async function gsrun(cl) {
                const gsapi = google.sheets({ version: 'v4', auth: cl });
                const updateOps = {
                    spreadsheetId: req.body.spreadsheetId,
                    range: 'Teams!A2',
                    valueInputOption: 'USER_ENTERED',
                    resource: { values: data }
                };
                let response = await gsapi.spreadsheets.values.update(updateOps);
                console.log(response);
            }
            console.log(data);
            res.status(200).json({
                message: "exporting data"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
}

exports.exportEvents = (req, res) => {
    Event.find()
        .exec()
        .then(docs => {
            let data = new Array();
            for (let i = 0; i < docs.length; i++) {
                let row = [
                    docs[i]._id,
                    docs[i].Event_name,
                    docs[i].Event_Description,
                    docs[i].Event_Fee,
                    docs[i].Event_Date,
                    docs[i].Event_Time,
                    docs[i].Event_Venue,
                    docs[i].Registration.required,
                    docs[i].Registration.registered,
                    docs[i].Event_Organizer.Organizing_team,
                    docs[i].Event_Organizer.Spoc_Count
                ]
                data.push(row);
            }
            client.authorize(function(err, tokens) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    console.log('connected');
                    gsrun(client);
                }
            });

            async function gsrun(cl) {
                const gsapi = google.sheets({ version: 'v4', auth: cl });
                const updateOps = {
                    spreadsheetId: req.body.spreadsheetId,
                    range: 'Events!A2',
                    valueInputOption: 'USER_ENTERED',
                    resource: { values: data }
                };
                let response = await gsapi.spreadsheets.values.update(updateOps);
                console.log(response);
            }
            console.log(data);
            res.status(200).json({
                message: "exporting data"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
}