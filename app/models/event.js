const mongoose = require('mongoose');
const EventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Event_name: { type: String, required: true },
    Event_Description: { type: String, required: true },
    Event_Fee: { type: Number, require: true, default: 0 },
    Event_Prices: {
        first: String,
        second: String,
        third: String,
        Consolation: String
    },
    Event_Date: { type: mongoose.Schema.Types.Date, requried: true },
    Event_Time: { type: String, required: true },
    Event_Venue: { type: String, required: true },
    Event_Organizer: {
        Organizing_team: { type: String, required: true },
        Spoc_Count: { type: Number, require: true },
        Spoc: [{
            Spoc_name: { type: String, required: true },
            Spoc_phone: { type: Number, required: true },
            Spoc_email: {
                type: String,
                match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                required: true
            }
        }]
    },
    Registration: {
        required: { type: Number, default: 0 },
        registered: { type: Number, default: 0 }
    }
});

module.exports = mongoose.model('Events', EventSchema);