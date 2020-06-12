const mongoose = require('mongoose');
const VolunteerSchema = mongoose.Schema({
    Volunteer_id: mongoose.Schema.Types.ObjectId,
    Volunteer_name: String,
    Volunteer_email: {
        type: String,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    Volunteer_password: String,
    Volunteer_phone: {
        type: Number,
        match: /^[0-9]{10}$/,
        required: true
    },
    Volunteer_class: String,
    Volunteer_divison: String
});

module.exports = mongoose.model('Volunteers', VolunteerSchema);