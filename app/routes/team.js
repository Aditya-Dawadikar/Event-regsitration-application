const express = require('express');
const router = express.Router();
const teamController = require('../controllers/team');

router.get('/', teamController.getAll);

router.post('/', teamController.createNewTeam);

router.delete('/', teamController.deleteAll);

router.get('/:id', teamController.getById);

router.patch('/:id', teamController.patchById);

router.delete('/:id', teamController.deleteById);

module.exports = router;