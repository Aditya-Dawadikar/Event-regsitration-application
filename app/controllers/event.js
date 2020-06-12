const mongoose = require('mongoose');
const Event = require('../models/event');
const jwt_decode = require('jwt-decode');

exports.getAll = (req, res, next) => {
    Event.find()
        .select('Event_name Event_id')
        .exec()
        .then(docs => {
            const resObject = {
                count: docs.length,
                Events: docs.map(doc => {
                    return {
                        Event_name: doc.Event_name,
                        Event_id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/event/' + doc._id
                        }
                    }
                })
            };
            res.status(200).json(resObject);
        })
        .catch(err => {
            res.status(500).json({
                error: {}
            });
        });
}

exports.createEvent = (req, res, next) => {
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
            required: req.body.Registration.required
        }
    });

    event.save()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.deleteAll = (req, res, next) => {
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
}

exports.getById = (req, res, next) => {
    id = req.params.id;
    Event.findById(id)
        .select('-__v')
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: "no valid entry found"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.patchById = (req, res, next) => {
    const id = req.params.id;
    const updateOperations = req.body;
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
}

exports.deleteById = (req, res, next) => {
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
}