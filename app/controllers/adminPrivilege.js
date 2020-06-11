const nodemailer = require('nodemailer');

exports.sendMailToAll = (req, res, next) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: req.body.from,
            pass: req.body.pass
        }
    });
    const email_option = {
        from: req.body.from,
        to: req.body.to,
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

}