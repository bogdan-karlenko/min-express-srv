var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var mongodb = require('mongodb')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'register.html'));
});

router.post('/newuser', function(req, res, next) {
  var MongoClient = mongodb.MongoClient;
  var url = 'mongodb://localhost:27017/min-express-srv';

  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log('Connection error:', err);
    } else {
      console.log('Successful connection');

      var collection = db.collection('users');

      var usr = req.body.username;
      var email = req.body.email;
      var pwd = req.body.password;

      collection.findOne({
        username: usr
      }, function(err, doc) {
        if (err) {
          console.log(err);
        } else if (!doc) {

          collection.insert({
            username: usr,
            email: email,
            password: pwd,
            role: 'user'
          }, function(err) {
            if (err) {
              console.log('Write error: ', err);
            } else {
              console.log('Write sucessful');
              db.close();
            }
          })

        } else {
          console.log('User already exists');
          db.close();
        }
      })

    }
  });

  res.redirect('/');
});

module.exports = router;
