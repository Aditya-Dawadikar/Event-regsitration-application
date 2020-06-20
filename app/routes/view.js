const express = require('express');
const app = express();
const viewController = require('../view');

app.get('/', viewController.indexPage);
app.get('/login', viewController.loginPage);
app.get('/adminlogin', viewController.adminLoginPage);
app.get('/volunteerlogin', viewController.volunteerLoginPage);
app.get('/adminsignup', viewController.adminSignUpPage);
app.get('/volunteersignup', viewController.volunteerSignUpPage);
app.get('/admindashboard', viewController.adminDashBoard);
app.get('/volunteerdashboard', viewController.volunteerDashBoard);

module.exports = app;