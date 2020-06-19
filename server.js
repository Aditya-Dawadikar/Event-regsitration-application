const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('file-system');
dotenv.config();

const app = express();

//connect to database
const connectionString = process.env.DB_CONNECTION_STRING;

mongoose.connect(
    connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

//require routes
const adminRoutes = require("./app/routes/admin");
const volunteerRoutes = require("./app/routes/volunteer");
const eventRoutes = require("./app/routes/event");
const teamRoutes = require("./app/routes/team");
const overviewRoutes = require("./app/routes/overview");
const tokenRoutes = require("./app/routes/token");
const exportRoutes = require("./app/routes/export");
const emailRoutes = require("./app/routes/email");
const resetPasswordRoutes = require('./app/routes/resetPassword');
const viewsRoutes = require('./app/routes/view');

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('views'));

//middleware to handle routes
app.use('/', viewsRoutes);
app.use('/admin', adminRoutes);
app.use('/volunteer', volunteerRoutes);
app.use('/event', eventRoutes);
app.use('/team', teamRoutes);
app.use('/overview', overviewRoutes);
app.use('/token', tokenRoutes);
app.use('/export', exportRoutes);
app.use('/email', emailRoutes);
app.use('/reset', resetPasswordRoutes);

//listen to port
app.listen(3000, () => {
    console.log("server running on port 3000");
});