const express = require('express');
const router = express.Router();
const adminController = require("../controllers/admin");
const adminAuth = require("../middleware/adminAuth");

router.post('/login', adminController.login);

router.post('/signup', adminController.signUp);

router.get('/', adminAuth, adminController.getAll);

router.patch('/:id', adminAuth, adminController.patchById);

router.delete('/:id', adminAuth, adminController.deleteAdmin);


module.exports = router;