const express = require("express");
const router = express.Router();
const overviewHandler = require("../controllers/overview");
const adminAuth = require("../middleware/adminAuth");
const volunteerAuth = require("../middleware/volunteerAuth");

router.get('/events', volunteerAuth, overviewHandler.visualizeEvents);

router.get('/teams', volunteerAuth, overviewHandler.getAllTeams);

router.get('/volunteers', adminAuth, overviewHandler.getAllVolunteers);

router.get('/admins', adminAuth, overviewHandler.getAllAdmins);

module.exports = router;