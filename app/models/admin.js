const mongoose = require('mongoose');
const AdminSchema = mongoose.Schema({
    Admin_id: mongoose.Schema.Types.ObjectId,
    Admin_name: String,
    Admin_email: {
        type: String,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    Admin_password: String
});

module.exports = mongoose.model('Admins', AdminSchema);