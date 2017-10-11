var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

router.post('/', function(req, res) {
  if (req.body.username === 'admin' && req.body.password === 'admin') {
    res.sendFile(path.join(__dirname, '../public', 'admin.html'))
    //res.redirect('/admin');
    // res.send({redirect: '/admin'});
  } else {
    res.sendStatus(401);
  }
})

module.exports = router;
