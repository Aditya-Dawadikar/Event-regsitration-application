exports.indexPage = (req, res) => {
    res.redirect('http://localhost:3000/index.html');
}

//login and signup routes
exports.loginPage = (req, res) => {
    res.sendFile(__dirname + "/views/pages/LoginSignup/LoginPage.html");
}
exports.adminLoginPage = (req, res) => {
    res.sendFile(__dirname + "/views/pages/LoginSignup/AdminLogin.html");
}
exports.volunteerLoginPage = (req, res) => {
    res.sendFile(__dirname + "/views/pages/LoginSignup/VolunteerLogin.html");
}
exports.adminSignUpPage = (req, res) => {
    res.sendFile(__dirname + "/views/pages/LoginSignup/AdminSignUp.html");
}
exports.volunteerSignUpPage = (req, res) => {
    res.sendFile(__dirname + "/views/pages/LoginSignup/VolunteerSignUp.html");
}
exports.adminDashBoard = (req, res) => {
    res.sendFile(__dirname + "/views/pages/Admin/AdminDashBoard.html");
}
exports.volunteerDashBoard = (req, res) => {
    res.sendFile(__dirname + "/views/pages/Volunteer/VolunteerDashBoard.html");
}

//data routes
exports.eventsPage = (req, res) => {
    res.sendFile(__dirname + "/views/pages/Data/events.html");
}
exports.teamsPage = (req, res) => {
    res.sendFile(__dirname + "/views/pages/Data/teams.html");
}
exports.volunteersPage = (req, res) => {
    res.sendFile(__dirname + "/views/pages/Data/volunteers.html");
}
exports.overviewPage = (req, res) => {
    res.sendFile(__dirname + "/views/pages/Data/overview.html");
}
exports.emailsPage = (req, res) => {
    res.sendFile(__dirname + "/views/pages/Data/email.html");
}