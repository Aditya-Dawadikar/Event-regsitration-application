const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const exportsController = require('../controllers/export');

router.get('/events', exportsController.exportEvents);

module.exports = router;