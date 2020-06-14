const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Volunteer = require('../models/volunteer');
const jwt = require('jsonwebtoken');

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
                        process.env.JWT_KEY, {
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
                _id: new mongoose.Types.ObjectId(),
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

exports.patchById = (req, res, next) => {
    const id = req.params.id;
    const updateOperations = req.body;
    for (const operations in updateOperations) {
        updateOperations[operations.propName] = operations.value;
    }
    Volunteer.update({ _id: id }, { $set: updateOperations })
        .exec()
        .then(doc => {
            res.status(200).json(doc);
            console.log(doc);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.deleteById = (req, res, next) => {
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
}