const express = require('express');
const router = express.Router();
const adminController = require("../controllers/admin");
const adminAuth = require("../middleware/adminAuth");
const adminPrivilegeController = require('../controllers/adminPrivilege');

//login and signup
router.post('/login', adminController.login);

router.post('/signup', adminController.signUp);

//CRUD
router.patch('/:id', adminController.patchById);

router.delete('/:id', adminController.deleteAdmin);

//get specific data for export
router.get('/email/teams', adminPrivilegeController.getAllTeamEmails);

router.get('/contact/teams', adminPrivilegeController.getAllTeamContacts);

//third party services
router.post('/emailTeams', adminPrivilegeController.sendMailToAllTeams);

router.post('/emailVolunteers', adminPrivilegeController.sendMailToAllVolunteers);

module.exports = router;