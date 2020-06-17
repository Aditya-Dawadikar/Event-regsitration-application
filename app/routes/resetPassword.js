const express = require('express');
const router = express.Router();
const resetPasswordController = require('../controllers/resetPassword.js');
const resetAuth = require('../middleware/resetAuth');

//admin logic
router.get('/admin/forgotpassword', resetPasswordController.sendAdminVerificationcode);
router.post('/admin/forgotpassword/verify', resetPasswordController.verifyCode);
router.post('/admin/forgotpassword/updatePassword', resetAuth, resetPasswordController.updateAdminPassword);

router.get('/volunteer/forgotpassword', resetPasswordController.sendVolunteerVerificationcode);
router.post('/volunteer/forgotpassword/verify', resetPasswordController.verifyCode);
router.post('/volunteer/forgotpassword/updatePassword', resetPasswordController.updateVolunteerPassword);

module.exports = router;