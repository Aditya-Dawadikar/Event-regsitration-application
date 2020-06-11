const nodemailer = require('nodemailer');
const jwt_decoder = require('jwt-decode');
const Team = require('../models/team');

exports.sendMailToAll = (req, res, next) => {

    const token = req.headers.authorization;
    const decoded = jwt_decoder(token);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: decoded.email,
            pass: req.body.pass
        }
    });

    console.log("handling");

    //find team emails
    Team.find()
        .exec()
        .then(docs => {

            //extract email from database
            var emailsRecipients = docs[0].Team_details.Team_Leader.Leader_email + ',';
            var team_email = "";
            for (i = 1; i < docs.length; i++) {
                if (i != (docs.length - 1)) {
                    team_email = emailsRecipients.concat(docs[i].Team_details.Team_Leader.Leader_email);
                    team_email = emailsRecipients.concat(',');
                    emailsRecipients = team_email;
                } else {
                    team_email = emailsRecipients.concat(docs[i].Team_details.Team_Leader.Leader_email);
                    emailsRecipients = team_email;
                }
            }

            console.log({
                emails: team_email
            });

            const email_option = {
                from: decoded.email,
                to: team_email,
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
                    result: result
                });
            });
            res.status(200).json({
                emails: team_email
            });
        })
        .catch(err => {
            res.status(404).json({
                error: err
            });
        });
}