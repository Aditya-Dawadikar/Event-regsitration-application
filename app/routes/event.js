const express = require('express');
const router = express.Router();
const eventHandler = require("../controllers/event");
const adminAuth = require("../middleware/adminAuth");
const volunteerAuth = require("../middleware/volunteerAuth");

//CRUD
router.post('/', adminAuth, eventHandler.createEvent);

router.delete('/', adminAuth, eventHandler.deleteAll);

router.get('/:id', eventHandler.getById);

router.patch('/:id', adminAuth, eventHandler.patchById);

router.delete('/:id', adminAuth, eventHandler.deleteById);

module.exports = router;