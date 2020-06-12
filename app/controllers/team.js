const mongoose = require('mongoose');
const Team = require('../models/team');
const Event = require('../models/event');

exports.getAll = (req, res, next) => {
    Team.find()
        .select('_id Team_details.Team_name Team_details.Team_Leader.Leader_name Team_details.Event.Event_name')
        .exec()
        .then(docs => {
            const resObject = {
                count: docs.length,
                Teams: docs.map(doc => {
                    return {
                        Team_name: doc.Team_details.Team_name,
                        Team_id: doc._id,
                        Team_Leader: doc.Team_details.Team_Leader.Leader_name,
                        Event: doc.Team_details.Event.Event_name,
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

exports.createNewTeam = (req, res, next) => {
    //find event id
    Event.find({ Event_name: req.body.Team_details.Event.Event_name })
        .exec()
        .then(doc => {
            const eventId = doc[0]._id;
            console.log(doc[0]);
            console.log("doc._id:" + eventId);

            //create new object
            const team = new Team({
                _id: new mongoose.Types.ObjectId(),
                Team_details: {
                    Team_name: req.body.Team_details.Team_name,
                    Team_Leader: {
                        Leader_name: req.body.Team_details.Team_Leader.Leader_name,
                        Leader_email: req.body.Team_details.Team_Leader.Leader_email,
                        Leader_phone: req.body.Team_details.Team_Leader.Leader_phone,
                        Alternative_phone: req.body.Team_details.Team_Leader.Alternative_phone
                    },
                    Team_Member_count: req.body.Team_details.Team_Member_count,
                    Team_Members: {
                        member_1: req.body.Team_details.Team_Members.member_1,
                        member_2: req.body.Team_details.Team_Members.member_2,
                        member_3: req.body.Team_details.Team_Members.member_3,
                        member_4: req.body.Team_details.Team_Members.member_4,
                    },
                    Event: {
                        Event_name: req.body.Team_details.Event.Event_name,
                        Event_id: eventId
                    },
                    Payment: {
                        Payment_method: req.body.Team_details.Payment.Payment_method,
                        Trasaction_Id: req.body.Team_details.Payment.Trasaction_Id,
                        Payment_status: req.body.Team_details.Payment.Payment_status
                    },
                    Registrtion_date: req.body.Team_details.Registrtion_date
                }
            });

            console.log("new team created");
            //save
            team.save()
                .then(result => {
                    console.log(result);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });

            /*
            //update event by id
            Event.Update({ _id: eventId }, {
                    $inc: {
                        "Registration.registered": 1
                    }
                })
                .exec()
                .then(doc => {
                    console.log(doc);
                    console.log("Event registred count updated successful");
                })
                .catch(err => {
                    res.status(404).json({
                        error: err
                    });
                })
            */
        })
        .catch(err => {
            res.status(404).json({
                error: err
            });
        });

}

exports.deleteAll = (req, res, next) => {
    Team.deleteMany()
        .exec()
        .then(result => {
            res.status(200).json({
                message: "successfully deleted"
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
    Team.findById(id)
        .select('-__v')
        .exec()
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

//some fixing need to be done for patch
exports.patchById = (req, res, next) => {
    const id = req.params.id;
    const updateOperation = req.body;
    for (const operations in req.body) {
        updateOperation[operations.propName] = operations.value;
    }
    Team.update({ _id: id }, { $set: updateOperation })
        .exec()
        .then(doc => {
            res.status(200).json({
                message: "updated successfully"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.deleteById = (req, res, next) => {
    id = req.params.id;
    Team.findByIdAndDelete(id)
        .exec()
        .then(doc => {
            res.status(200).json({
                message: "Successfully deleted"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}