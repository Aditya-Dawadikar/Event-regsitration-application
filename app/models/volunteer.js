const mongoose = require('mongoose');
const VolunteerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Volunteer_name: String,
    Volunteer_email: String,
    Volunteer_password: String,
    Volunteer_phone: Number,
    Volunteer_class: Number,
    Volunteer_divison: String,
    required: true
});

module.exports = mongoose.model('Volunteers', VolunteerSchema);