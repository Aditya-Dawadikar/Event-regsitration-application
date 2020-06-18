const express = require('express');
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const emailController = require('../controllers/email');

router.post('/Teams', adminAuth, emailController.sendMailToAllTeams);

router.post('/Teams/:eventId', adminAuth, emailController.sendMailToTeamsByEventId);

router.post('/Volunteers', adminAuth, emailController.sendMailToAllVolunteers);

module.exports = router;