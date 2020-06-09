const express = require('express');
const router = express.Router();
const eventHandler = require("../controllers/event");

router.get('/', eventHandler.getAll);

router.post('/', eventHandler.createEvent);

router.delete('/', eventHandler.deleteAll);

router.get('/:id', eventHandler.getById);

router.patch('/:id', eventHandler.patchById);

router.delete('/:id', eventHandler.deleteById);

module.exports = router;