const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ info: 'Node.js, Express, and Postgres API' })
});

module.exports = router;
