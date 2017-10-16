var express = require('express');
var router = express.Router();
var path = require('path');
var mongodb = require('mongodb');

router.get('/', function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
  }
});

module.exports = router;
