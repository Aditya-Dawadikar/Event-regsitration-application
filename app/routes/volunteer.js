const express = require('express');
const router = express.Router();
const volunteerController = require("../controllers/volunteer");

router.post('/login', volunteerController.login);

router.post('/signup', volunteerController.signUp);

router.get('/', volunteerController.getAll);

router.patch('/:id', volunteerController.patchById);

router.delete('/:id', volunteerController.deleteById);


module.exports = router;