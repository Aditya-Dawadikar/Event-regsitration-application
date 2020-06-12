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
        Consolation: String
    },
    Event_Date: mongoose.Schema.Types.Date,
    Event_Time: String,
    Event_Venue: String,
    Event_Organizer: {
        Organizing_team: String,
        Spoc_1: {
            Spoc_1_name: String,
            Spoc_1_phone: Number,
            Spoc_1_email: {
                type: String,
                match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
            }
        },
        Spoc_2: {
            Spoc_2_name: String,
            Spoc_2_phone: Number,
            Spoc_2_email: {
                type: String,
                match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
            }
        }
    },
    Registration: {
        required: Number,
        registered: Number
    }
});

module.exports = mongoose.model('Events', EventSchema);