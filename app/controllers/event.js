const mongoose = require('mongoose');
const Event = require('../models/event');
const jwt_decode = require('jwt-decode');

exports.getAll = (req, res, next) => {
    Event.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.createEvent = (req, res, next) => {
    const token = req.headers.authorization;
    const splitToken = token.split(" ");
    const requiredToken = splitToken[1];

    const decoded = jwt_decode(requiredToken);

    if (decoded.role === 'admin') {
        const event = new Event({
            _id: new mongoose.Types.ObjectId(),
            Event_name: req.body.Event_name,
            Event_Description: req.body.Event_Description,
            Event_Fee: req.body.Event_Fee,
            Event_Prices: {
                first: req.body.Event_Prices.first,
                second: req.body.Event_Prices.second,
                third: req.body.Event_Prices.third,
                Consolation: req.body.Event_Prices.Consolation
            },
            Event_Date: req.body.Event_Date,
            Event_Time: req.body.Event_Time,
            Event_Venue: req.body.Event_Venue,
            Event_Organizer: {
                Organizing_team: req.body.Event_Organizer.Organizing_team,
                Spoc_1: {
                    Spoc_1_name: req.body.Event_Organizer.Spoc_1_name,
                    Spoc_1_phone: req.body.Event_Organizer.Spoc_1_phone,
                    Spoc_1_email: req.body.Event_Organizer.Spoc_1_email
                },
                Spoc_2: {
                    Spoc_2_name: req.body.Event_Organizer.Spoc_2_name,
                    Spoc_2_phone: req.body.Event_Organizer.Spoc_2_phone,
                    Spoc_2_email: req.body.Event_Organizer.Spoc_2_email
                }
            },
            Registration: {
                required: req.body.Registration.required,
                registered: req.body.Registration.registered
            }
        });

        event.save()
            .then(doc => {
                res.status(200).json(doc);
                console.log(doc);
            })
            .catch(err => {
                console.log(err);
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

exports.deleteAll = (req, res, next) => {
    const token = req.headers.authorization;
    const splitToken = token.split(" ");
    const requiredToken = splitToken[1];

    const decoded = jwt_decode(requiredToken);

    if (decoded.role === 'admin') {
        Event.deleteMany()
            .exec()
            .then(docs => {
                console.log("deleted successfully");
                res.status(200).json({
                    message: "deleted all events successfully"
                });
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

exports.getById = (req, res, next) => {
    id = req.params.id;
    Event.findById(id)
        .exec()
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

exports.patchById = (req, res, next) => {
    const token = req.headers.authorization;
    const splitToken = token.split(" ");
    const requiredToken = splitToken[1];

    const decoded = jwt_decode(requiredToken);

    if (decoded.role === 'admin') {
        const id = req.params.id;
        const updateOperations = {};
        for (const operations in updateOperations) {
            updateOperations[operations.propName] = operations.value;
        }
        Event.update({ _id: id }, { $set: updateOperations })
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
    } else {
        res.status(401).json({
            message: "access denied!"
        });
    }
}

exports.deleteById = (req, res, next) => {
    const token = req.headers.authorization;
    const splitToken = token.split(" ");
    const requiredToken = splitToken[1];

    const decoded = jwt_decode(requiredToken);

    if (decoded.role === 'admin') {
        id = req.params.id;
        Event.findById(id)
            .exec()
            .then(doc => {
                console.log("deleted successfully");
                res.status(200).json({
                    message: "deleted successfully"
                });
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