const mongoose = require('mongoose');
const AdminSchema = mongoose.Schema({
    Admin_id: mongoose.Schema.Types.ObjectId,
    Admin_name: String,
    Admin_email: String,
    Admin_password: String,
    required: true
});

module.exports = mongoose.model('Admins', AdminSchema);