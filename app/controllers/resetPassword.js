const Admin = require('../models/admin');
const Volunteer = require('../models/volunteer');
const Email = require('../controllers/email')
const ResetPasswordCode = require('../models/resetPasswordCode');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.sendAdminVerificationcode = (req, res, next) => {
    const email = req.body.email;
    const code = Math.floor(Math.random() * 10000000 + 1);
    const verificationCode = new ResetPasswordCode({
        verificationCode: code
    });
    verificationCode.save()
        .then()
        .catch(err => {
            error: err
        });

    console.log(verificationCode);
    //Email.sendVerificationEmail(email, code);
    res.status(200).json({
        message: "verification code sent to the given email"
    });
}

exports.updateAdminPassword = (req, res, next) => {
    const email = req.body.email;
    const updatedPassword = req.body.updatedEmail;
    bcrypt.hash(updatedPassword, 10, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(200).json({
                error: err
            });
        }
        Admin.findByIdAndUpdate({ Admin_email: email }, { $set: { Admin_password: result } })
            .exec()
            .then(res => {
                res.status(200).json({
                    message: "update successful",
                    result: res
                });
                console.log("update successful");
                console.log(res);
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({
                    error: err
                })
            });
    });
}

exports.sendVolunteerVerificationcode = (req, res, next) => {
    res.status(200).json({
        message: "sending Volunteer verification code"
    });
}

exports.updateVolunteerPassword = (req, res, next) => {
    res.status(200).json({
        message: "updating volunteer password"
    });
}

exports.verifyCode = (req, res, next) => {
    const token = jwt.sign({
            email: req.body.email
        },
        process.env.JWT_KEY, {
            expiresIn: 60 * 10
        });

    ResetPasswordCode.find({ verificationCode: req.body.verificationCode })
        .exec()
        .then(result => {
            if (result.length < 1) {
                return res.status(404).json({
                    message: "wrong verification code"
                })
            } else {
                res.status(200).json({
                    result: result,
                    token: token,
                    message: "user verified"
                });
                ResetPasswordCode.findByIdAndDelete(result[0]._id)
                    .exec()
                    .then(result => {
                        console.log("verification code from database cleared");
                    })
                    .catch(err => {
                        error: err
                    })
            }
        })
        .catch(err => {
            error: err
        })
}