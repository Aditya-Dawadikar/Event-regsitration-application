const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//connect to database
mongoose.connect(
    'mongodb+srv://event:event@project-cluster-a7qik.mongodb.net/<dbname>?retryWrites=true&w=majority', {
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

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//middleware to handle routes
app.use('/admin', adminRoutes);
app.use('/volunteer', volunteerRoutes);
app.use('/event', eventRoutes);
app.use('/team', teamRoutes);
app.use('/overview', overviewRoutes);

//listen to port
app.listen(3000, () => {
    console.log("server running on port 3000");
});