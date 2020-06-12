const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const jwt_key = "mykey";

exports.login = (req, res, next) => {
    Admin.find({ Admin_email: req.body.Admin_email })
        .exec()
        .then(doc => {
            if (doc.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            bcrypt.compare(req.body.Admin_password, doc[0].Admin_password, (err, result) => {
                if (err) {
                    res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    const token = jwt.sign({
                            email: doc[0].Admin_email,
                            docId: doc[0]._id,
                            role: "admin"
                        },
                        jwt_key, {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    });
                }
                res.status(401).json({
                    message: "Auth Failed"
                });
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
}

exports.signUp = (req, res, next) => {
    bcrypt.hash(req.body.Admin_password, 10, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
            return
        } else {
            const admin_password = result;
            const admin = new Admin({
                _id: new mongoose.Types.ObjectId(),
                Admin_name: req.body.Admin_name,
                Admin_email: req.body.Admin_email,
                Admin_password: admin_password
            });

            admin.save()
                .then(doc => {
                    console.log(doc);
                    res.status(200).json(doc);
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
    Admin.update({ _id: id }, { $set: updateOperations })
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

exports.deleteAdmin = (req, res, next) => {
    const id = req.body.id;
    Admin.findByIdAndDelete(id)
        .exec()
        .then(docs => {
            res.status(200).json(docs);
            console.log(json);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
}