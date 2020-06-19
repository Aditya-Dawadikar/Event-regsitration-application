const mongoose = require('mongoose');
const Team = require('../models/team');
const Event = require('../models/event');

exports.createNewTeam = (req, res, next) => {
    //find event id
    Event.find({ Event_name: req.body.Event.Event_name })
        .exec()
        .then(doc => {
            const eventId = doc[0]._id;
            const registeredCount = doc[0].Registration.registered;
            const Count = registeredCount + 1;

            const members = new Array();
            for (let i = 0; i < req.body.Team_Member_count; i++) {
                const member = { member_name: req.body.Team_Members[i].member_name };
                members.push(member);
            }

            //create new object
            const team = new Team({
                _id: new mongoose.Types.ObjectId(),
                Team_name: req.body.Team_name,
                Team_Leader: {
                    Leader_name: req.body.Team_Leader.Leader_name,
                    Leader_email: req.body.Team_Leader.Leader_email,
                    Leader_phone: req.body.Team_Leader.Leader_phone,
                    Alternative_phone: req.body.Team_Leader.Alternative_phone
                },
                Team_Member_count: req.body.Team_Member_count,
                Team_Members: members,
                Event: {
                    Event_name: req.body.Event.Event_name,
                    Event_id: eventId
                },
                Payment: {
                    Payment_method: req.body.Payment.Payment_method,
                    Trasaction_Id: req.body.Payment.Trasaction_Id,
                    Payment_status: req.body.Payment.Payment_status
                },
                Registrtion_date: req.body.Registrtion_date

            });

            //save
            team.save()
                .then(result => {
                    Event.findByIdAndUpdate(eventId, { $set: { 'Registration.registered': Count } }, { useFindAndModify: false })
                        .exec()
                        .then(doc => {
                            res.status(200).json({
                                message: "new team created successfully"
                            });
                        })
                        .catch(err => {
                            res.status(404).json({
                                error: err
                            });
                        })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
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
                return res.status(200).json(doc);
            } else {
                return res.status(404).json({
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
    const updateOperation = req.body;
    for (const operations in req.body) {
        updateOperation[operations.propName] = operations.value;
    }
    Team.updateOne({ _id: id }, { $set: updateOperation })
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
            if (doc === null) {
                return res.status(400).json({
                    message: "not found"
                });
            }
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