const express = require('express');
const router = express.Router();
const adminController = require("../controllers/admin");
const volunteerController = require("../controllers/volunteer");

router.get('/refresh/admin', adminController.sendToken);
router.get('/refresh/volunteer', volunteerController.sendToken);

module.exports = router;