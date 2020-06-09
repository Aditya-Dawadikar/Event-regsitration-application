const mongoose = require('mongoose');
const EventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Event_name: String,
    Event_Description: String,
    Event_Fee: Number,
    Event_Prices: {
        first: String,
        second: String,
        third: String,
        Constellation: String,
        required: true
    },
    Event_Date: mongoose.Schema.Types.Date,
    Event_Time: String,
    Event_Venue: String,
    Event_Organizer: {
        Organizing_team: String,
        Spoc_1: {
            Spoc_name: String,
            Spoc_phone: Number,
            Spoc_email: String
        },
        Spoc_2: {
            Spoc_name: String,
            Spoc_phone: Number,
            Spoc_email: String
        },
        required: true
    },
    Registration: {
        required: Number,
        registered: Number
    }
});

module.exports = mongoose.model('Events', EventSchema);