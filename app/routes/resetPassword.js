const express = require('express');
const router = express.Router();
const resetPasswordController = require('../controllers/resetPassword.js');
const resetAuth = require('../middleware/resetAuth');

//admin logic
router.get('/forgotpassword', resetPasswordController.sendVerificationcode);
router.post('/forgotpassword/verify', resetPasswordController.verifyCode);
router.post('/admin/forgotpassword/updatePassword', resetAuth, resetPasswordController.updateAdminPassword);
router.post('/volunteer/forgotpassword/updatePassword', resetAuth, resetPasswordController.updateVolunteerPassword);

module.exports = router;