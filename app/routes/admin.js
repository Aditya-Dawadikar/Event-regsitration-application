const express = require('express');
const router = express.Router();
const adminController = require("../controllers/admin");

router.post('/login', adminController.login);

router.post('/signup', adminController.signUp);

router.get('/', adminController.getAll);

router.patch('/:id', adminController.patchById);

router.delete('/:id', adminController.deleteAdmin);


module.exports = router;