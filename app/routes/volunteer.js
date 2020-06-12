const express = require('express');
const router = express.Router();
const volunteerController = require("../controllers/volunteer");
const adminAuth = require("../middleware/adminAuth");
const volunteerAuth = require("../middleware/volunteerAuth");

//login and signup
router.post('/login', volunteerController.login);

router.post('/signup', volunteerController.signUp);

//CRUD
router.get('/', volunteerController.getAll);

router.patch('/:id', volunteerController.patchById);

router.delete('/:id', volunteerController.deleteById);


module.exports = router;