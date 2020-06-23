const Event = require('../models/event');
const Team = require('../models/team');
const Volunteer = require('../models/volunteer');
const Admin = require('../models/admin');

exports.visualizeEvents = (req, res, next) => {
    Event.find()
        .select('Event_name Registration.required Registration.registered')
        .exec()
        .then(docs => {
            if (docs.length < 1) {
                return res.status(400).json({
                    message: "not found"
                });
            }
            const eventData = new Array();
            for (let i = 0; i < docs.length; i++) {
                const obj = {
                    _id: docs[i]._id,
                    Event_name: docs[i].Event_name,
                    required: docs[i].Registration.required,
                    registered: docs[i].Registration.registered
                }
                eventData.push(obj);
            }
            const resObj = {
                total: docs.length,
                eventData: eventData
            }

            res.status(200).json(resObj);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
}

exports.getAllTeams = (req, res, next) => {
    Team.find()
        .select('_id Team_name Team_Leader.Leader_name Event.Event_name')
        .exec()
        .then(docs => {
            if (docs.length < 1) {
                return res.status(400).json({
                    message: "not found"
                });
            }
            const resObject = {
                count: docs.length,
                Teams: docs.map(doc => {
                    return {
                        Team_name: doc.Team_name,
                        Team_id: doc._id,
                        Team_Leader: doc.Team_Leader.Leader_name,
                        Event: doc.Event.Event_name,
                        request: {
                            type: 'GET',
                            url: "http://localhost:3000/team/" + doc._id
                        }
                    }
                })
            };
            res.status(200).json(resObject);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.getAllVolunteers = (req, res, next) => {
    Volunteer.find()
        .select('Volunteer_id Volunteer_name Volunteer_phone')
        .exec()
        .then(docs => {
            if (docs.length < 1) {
                return res.status(400).json({
                    message: "not found"
                });
            }
            const resObject = {
                count: docs.length,
                volunteer: docs.map(doc => {
                    return {
                        Volunteer_id: doc._id,
                        Volunteer_name: doc.Volunteer_name,
                        Volunteer_phone: doc.Volunteer_phone,
                    }
                })
            }
            res.status(200).json(resObject);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.getAllAdmins = (req, res, next) => {
    Admin.find()
        .exec()
        .then(docs => {
            if (docs.length < 1) {
                return res.status(400).json({
                    message: "not found"
                });
            }
            const resObject = {
                count: docs.length,
                volunter: docs.map(doc => {
                    return {
                        Admin_id: doc._id,
                        Admin_name: doc.Admin_name,
                        Admin_phone: doc.Admin_phone,
                    }
                })
            }
            res.status(200).json(resObject);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
}