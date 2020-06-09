const mongoose = require('mongoose');
const TeamSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Team_details: {
        Team_name: String,
        Team_Leader: {
            Leader_name: String,
            Leader_email: String,
            Leader_phone: Number,
            Alternative_phone: Number,
            required: true
        },
        Team_Member_count: {
            type: Number,
            required: true
        },
        Team_Members: {
            member_1: String,
            member_2: String,
            member_3: String,
            member_4: String,
        },
        Event: {
            Event_name: String,
            Event_description: String,
            Event_time: String,
            Event_date: mongoose.Schema.Types.Date,
            ref: 'Events',
            required: true
        },
        Payment: {
            Payment_method: String,
            Trasaction_Id: String,
            Payment_status: String,
            required: true
        },
        Registrtion_date: {
            type: mongoose.Schema.Types.Date,
            required: true
        }
    }
});

module.exports = mongoose.model('Teams', TeamSchema);