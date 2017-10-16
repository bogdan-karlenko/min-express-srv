var express = require('express');
var router = express.Router();
var path = require('path');
var mongodb = require('mongodb');

router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, '../public/html', 'profile.html'));
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
