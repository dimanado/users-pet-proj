const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-contoller');

// Define routes
router.get('/', UserController.getAllUsers);
router.get('/:userId', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:userId', UserController.updateUser);
router.delete('/:userId', UserController.deleteUser);

module.exports = router;
