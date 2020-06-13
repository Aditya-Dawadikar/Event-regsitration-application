const express = require('express');
const router = express.Router();
const teamController = require('../controllers/team');
const volunteerAuth = require('../middleware/volunteerAuth');
const adminAuth = require('../middleware/adminAuth');

//CRUD
router.post('/', volunteerAuth, teamController.createNewTeam);

router.delete('/', adminAuth, teamController.deleteAll);

router.get('/:id', volunteerAuth, teamController.getById);

router.patch('/:id', volunteerAuth, teamController.patchById);

router.delete('/:id', volunteerAuth, teamController.deleteById);

module.exports = router;