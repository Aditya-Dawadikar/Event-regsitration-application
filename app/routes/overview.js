const express = require("express");
const router = express.Router();
const overviewHandler = require("../controllers/overview");

router.get('/events', overviewHandler.visualizeEvents);

router.get('/teams', overviewHandler.getAllTeams);

router.get('/volunteers', overviewHandler.getAllVolunteers);

router.get('/admins', overviewHandler.getAllAdmins);

module.exports = router;