const express = require('express');
const app = express();
const viewController = require('../view');

app.get('/', viewController.indexPage);

//login signup routes
app.get('/login', viewController.loginPage);
app.get('/adminlogin', viewController.adminLoginPage);
app.get('/volunteerlogin', viewController.volunteerLoginPage);
app.get('/adminsignup', viewController.adminSignUpPage);
app.get('/volunteersignup', viewController.volunteerSignUpPage);
app.get('/admindashboard', viewController.adminDashBoard);
app.get('/volunteerdashboard', viewController.volunteerDashBoard);

//data routes
app.get('/volunteers', viewController.volunteersPage);
app.get('/teams', viewController.teamsPage);
app.get('/overview', viewController.overviewPage);
app.get('/events', viewController.eventsPage);
app.get('/email', viewController.emailsPage);

//registration routes
app.get('/registerteam', viewController.resgisterTeamPage);
app.get('/registerevent', viewController.registerEventPage);

module.exports = app;