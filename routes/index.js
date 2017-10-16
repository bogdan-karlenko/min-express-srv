var express = require('express');
var router = express.Router();
var path = require('path');


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user);
  console.log(req.isAuthenticated());
  res.sendFile(path.join(__dirname, '../public/html', 'index.html'));
});

module.exports = router;
