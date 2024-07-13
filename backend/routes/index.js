const express = require('express');
const router = express.Router();
const passport = require('passport');

const LoginController = require('../controllers/login-controller');

router.post('/login', passport.authenticate('local'), LoginController.login);

module.exports = router;
