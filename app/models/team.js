const mongoose = require('mongoose');
const TeamSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Team_name: { type: String, required: true },
    Team_Leader: {
        Leader_name: { type: String, required: true },
        Leader_email: {
            type: String,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
        Leader_phone: {
            type: Number,
            match: /^[0-9]{10}$/,
            required: true
        },
        Alternative_phone: {
            type: Number,
            match: /^[0-9]{10}$/,
            required: true
        }
    },
    Team_Member_count: { type: Number, required: true },
    Team_Members: [{
        member_name: { type: String, required: true }
    }],
    Event: {
        Event_name: { type: String, required: true },
        Event_id: String
    },
    Payment: {
        Payment_method: String,
        Trasaction_Id: String,
        Payment_status: String
    },
    Registrtion_date: {
        type: mongoose.Schema.Types.Date
    }
});

module.exports = mongoose.model('Teams', TeamSchema);