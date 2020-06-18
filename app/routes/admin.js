const express = require('express');
const router = express.Router();
const adminController = require("../controllers/admin");
const adminAuth = require("../middleware/adminAuth");
const adminPrivilegeController = require('../controllers/adminPrivilege');

//login and signup
router.post('/login', adminController.login);

router.post('/signup', adminController.signUp);

//CRUD
router.patch('/:id', adminAuth, adminController.patchById);

router.delete('/:id', adminAuth, adminController.deleteAdmin);

//get specific data for export
router.get('/email/teams', adminAuth, adminPrivilegeController.getAllTeamEmails);

router.get('/contact/teams', adminAuth, adminPrivilegeController.getAllTeamContacts);

router.get('/email/Volunteers', adminAuth, adminPrivilegeController.getAllVolunteerEmails);

router.get('/contact/Volunteers', adminAuth, adminPrivilegeController.getAllVolunteerContacts);


module.exports = router;