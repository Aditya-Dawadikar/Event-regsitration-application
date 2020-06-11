const express = require('express');
const router = express.Router();
const adminController = require("../controllers/admin");
const adminAuth = require("../middleware/adminAuth");
const adminPrivilegeController = require('../controllers/adminPrivilege');

router.post('/login', adminController.login);

router.post('/signup', adminController.signUp);

router.get('/', adminAuth, adminController.getAll);

router.patch('/:id', adminAuth, adminController.patchById);

router.delete('/:id', adminAuth, adminController.deleteAdmin);

//third party services
router.post('/email', adminAuth, adminPrivilegeController.sendMailToAll);

module.exports = router;