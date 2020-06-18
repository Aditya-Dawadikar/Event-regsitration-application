const Admin = require('../models/admin');
const Volunteer = require('../models/volunteer');
const Email = require('../controllers/email')
const ResetPasswordCode = require('../models/resetPasswordCode');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.sendVerificationcode = (req, res, next) => {
    const email = req.body.email;
    const code = Math.floor(Math.random() * 1000000 + 1);
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

exports.updateAdminPassword = (req, res, next) => {
    const email = req.body.email;
    const updatedPassword = req.body.updatedPassword;
    bcrypt.hash(updatedPassword, 10, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(200).json({
                error: err
            });
        }
        Admin.findOneAndUpdate({ Admin_email: email }, { $set: { Admin_password: result } }, { useFindAndModify: false })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: "update successful",
                    result: result
                });
                //console.log("update successful");
                //console.log(result);
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({
                    error: err
                })
            });
    });
}

exports.updateVolunteerPassword = (req, res, next) => {
    const email = req.body.email;
    const updatedPassword = req.body.updatedPassword;
    bcrypt.hash(updatedPassword, 10, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(200).json({
                error: err
            });
        }
        Volunteer.findOneAndUpdate({ Volunteer_email: email }, { $set: { Volunteer_password: result } }, { useFindAndModify: false })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: "update successful",
                    result: result
                });
                //console.log("update successful");
                //console.log(result);
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({
                    error: err
                })
            });
    });
}