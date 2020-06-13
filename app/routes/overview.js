const express = require("express");
const router = express.Router();
const overviewHandler = require("../controllers/overview");
const adminAuth = require("../middleware/adminAuth");

router.get('/events', overviewHandler.visualizeEvents);

router.get('/teams', overviewHandler.getAllTeams);

router.get('/volunteers', overviewHandler.getAllVolunteers);

router.get('/admins', adminAuth, overviewHandler.getAllAdmins);

module.exports = router;