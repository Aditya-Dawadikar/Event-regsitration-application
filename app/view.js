exports.indexPage = (req, res) => {
    res.redirect('http://localhost:3000/index.html');
}
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