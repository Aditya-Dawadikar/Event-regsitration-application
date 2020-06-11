const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Volunteer = require('../models/volunteer');
const jwt = require('jsonwebtoken');
const jwt_key = "mykey";
const jwt_decode = require('jwt-decode');

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
                            userId: doc[0]._id,
                            role: "volunteer"
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
    const token = req.headers.authorization;
    const splitToken = token.split(" ");
    const requiredToken = splitToken[1];

    const decoded = jwt_decode(requiredToken);

    if (decoded.role === 'admin') {
        Volunteer.find()
            .exec()
            .then(docs => {
                res.status(200).json(docs);
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    } else {
        res.status(401).json({
            message: "access denied!"
        });
    }
}

exports.patchById = (req, res, next) => {
    res.status(200).json({
        message: "handling patchById"
    });
}

exports.deleteById = (req, res, next) => {
    const token = req.headers.authorization;
    const splitToken = token.split(" ");
    const requiredToken = splitToken[1];

    const decoded = jwt_decode(requiredToken);

    if (decoded.role === 'admin') {
        const id = req.params.id;
        Volunteer.findByIdAndDelete(id)
            .exec()
            .then(result => {
                res.status(200).json({
                    message: "successfully deleted",
                    doc: result
                });
            })
            .catch(err => {
                error: err
            })
    } else {
        res.status(401).json({
            message: "access denied!"
        });
    }
}