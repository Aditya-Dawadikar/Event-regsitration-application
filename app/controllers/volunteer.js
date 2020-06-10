const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Volunteer = require('../models/volunteer');
const jwt = require('jsonwebtoken');
const jwt_key = "mykey";

exports.login = (req, res, next) => {
    Volunteer.find({ Volunteer_email: req.body.Volunteer_email })
        .exec()
        .then(doc => {
            if (doc.lenght < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            bcrypt.compare(req.body.Volunteer_password, doc[0].Volunteer_password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    const token = jwt.sign({
                            email: doc[0].Volunteer_email,
                            userId: doc[0]._id
                        },
                        jwt_key, {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: "Auth successfull",
                        token: token
                    });
                }
            });

        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.Volunteer_password, 10, (err, result) => {
        if (err) {
            return res.status(401).json({
                message: "Auth failed"
            })
        }
        if (result) {
            const volunteer = new Volunteer({
                Volunteer_id: new mongoose.Types.ObjectId(),
                Volunteer_name: req.body.Volunteer_name,
                Volunteer_email: req.body.Volunteer_email,
                Volunteer_password: result,
                Volunteer_phone: req.body.Volunteer_phone,
                Volunteer_class: req.body.Volunteer_class,
                Volunteer_divison: req.body.Volunteer_divison
            });
            volunteer.save()
                .then(doc => {
                    console.log(doc);
                    res.status(200).json({
                        message: "succesfully registered",
                        result: doc
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        }
    });
}

exports.getAll = (req, res, next) => {
    res.status(200).json({
        message: "handling getAll"
    });
}

exports.patchById = (req, res, next) => {
    res.status(200).json({
        message: "handling patchById"
    });
}

exports.deleteById = (req, res, next) => {
    res.status(200).json({
        message: "handling deleteById"
    });
}