const mongoose = require('mongoose');
const resetPasswordCode = mongoose.Schema({
    verificationCode: Number
});

module.exports = mongoose.model('resetPasswordCode', resetPasswordCode);