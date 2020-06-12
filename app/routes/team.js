const express = require('express');
const router = express.Router();
const teamController = require('../controllers/team');
const volunteerAuth = require('../middleware/volunteerAuth');

//CRUD
router.get('/', teamController.getAll);

router.post('/', volunteerAuth, teamController.createNewTeam);

router.delete('/', volunteerAuth, teamController.deleteAll);

router.get('/:id', teamController.getById);

router.patch('/:id', volunteerAuth, teamController.patchById);

router.delete('/:id', volunteerAuth, teamController.deleteById);

module.exports = router;