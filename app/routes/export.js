const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const exportsController = require('../controllers/export');

router.get('/events', adminAuth, exportsController.exportEvents);
router.get('/teams', adminAuth, exportsController.exportTeams);
router.get('/volunteers', adminAuth, exportsController.exportVolunteers);

module.exports = router;