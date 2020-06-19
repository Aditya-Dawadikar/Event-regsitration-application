const express = require('express');
const router = express();
const viewController = require('../view');

router.get('/', viewController.indexPage);
router.get('/login', viewController.loginPage);
router.get('/adminlogin', viewController.adminLoginPage);
router.get('/volunteerlogin', viewController.volunteerLoginPage);
router.get('/adminsignup', viewController.adminSignUpPage);
router.get('/volunteersignup', viewController.volunteerSignUpPage);
router.get('/admindashboard', viewController.adminDashBoard);
router.get('/volunteerdashboard', viewController.volunteerDashBoard);

module.exports = router;