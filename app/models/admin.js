const mongoose = require('mongoose');
const AdminSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Admin_name: {
        type: String,
        requried: true
    },
    Admin_email: {
        type: String,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        required: true
    },
    Admin_password: {
        type: String,
        requried: true
    }
});

module.exports = mongoose.model('Admins', AdminSchema);