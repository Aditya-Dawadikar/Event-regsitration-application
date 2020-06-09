const mongoose = require('mongoose');
const Team = require('../models/team');

exports.getAll = (req, res, next) => {
    Team.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json({
                result: docs
            });
        })
        .catch(err => {
            res.status(404).json({
                error: err
            });
        });
}

exports.createNewTeam = (req, res, next) => {
    //validate
    if (!req.body) {
        res.status(400).json({
            message: "request body cannot be empty"
        });
    }
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
                Event_id: req.body.Team_details.Event.Event_id
            },
            Payment: {
                Payment_method: req.body.Team_details.Payment.Payment_method,
                Trasaction_Id: req.body.Team_details.Payment.Trasaction_Id,
                Payment_status: req.body.Team_details.Payment.Payment_status
            },
            Registrtion_date: req.body.Team_details.Registrtion_date
        }
    });

    //save
    team.save()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
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
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json({
                result: doc
            });
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
    const updateOperation = {};
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