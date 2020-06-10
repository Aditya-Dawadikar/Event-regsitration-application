const mongoose = require('mongoose');
const VolunteerSchema = mongoose.Schema({
    Volunteer_id: mongoose.Schema.Types.ObjectId,
    Volunteer_name: String,
    Volunteer_email: String,
    Volunteer_password: String,
    Volunteer_phone: Number,
    Volunteer_class: String,
    Volunteer_divison: String
});

module.exports = mongoose.model('Volunteers', VolunteerSchema);