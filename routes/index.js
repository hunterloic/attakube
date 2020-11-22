const express = require('express');
const router = express.Router();
const logger = require("../middleware/logger");

router.get('/', async (req, res) => {
  
  res.render('index', {});

});

module.exports = router; 
