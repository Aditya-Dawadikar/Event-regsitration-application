const Volunteer = require('../models/volunteer');
const Team = require('../models/team');
const Event = require('../models/event');

exports.exportEvents = (req, res) => {
    console.log('exporting data');
    res.status(200).json({
        message: "exporting data"
    });
}