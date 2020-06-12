const mongoose = require('mongoose');
const VolunteerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Volunteer_name: { type: String, required: true },
    Volunteer_email: {
        type: String,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        required: true
    },
    Volunteer_password: { type: String, required: true },
    Volunteer_phone: {
        type: Number,
        match: /^[0-9]{10}$/,
        required: true
    },
    Volunteer_class: String,
    Volunteer_divison: String
});

module.exports = mongoose.model('Volunteers', VolunteerSchema);