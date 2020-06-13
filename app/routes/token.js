const express = require('express');
const router = express.Router();
const refreshAdminToken = require('../middleware/refreshAdminToken');
const adminController = require("../controllers/admin");

router.get('/refresh', adminController.sendToken);

module.exports = router;