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

exports.exportEvents = (req, res) => {

    Event.find()
        .exec()
        .then(docs => {
            let data = new Array();
            for (let i = 0; i < docs.length; i++) {
                /*let spocCount = doc[i].Event_Organizer.Spoc_Count;
                let spoc_member = docs[i].Event_Organizer.Spoc[0].Spoc_name;
                let spoc = "";
                if (i != (docs.length - 1)) {
                    for (let j = 1; j < spocCount; j++) {
                        spoc = spoc_member.concat(docs[i].Event_Organizer.Spoc[j].Spoc_name);
                        spoc_member = spoc;
                        spoc = spoc_member.concat(',');
                        spoc_member = spoc;
                    }
                } else {
                    spoc = spoc_member.concat(docs[i].Event_Organizer.Spoc[j].Spoc_name);
                    spoc_member = spoc;
                }*/

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
                    spreadsheetId: '1iC7OUFAXf9jHz4bE5_qtBM5MQ5cJkHXICcPXJOXqSes',
                    range: 'Sheet1!A2',
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