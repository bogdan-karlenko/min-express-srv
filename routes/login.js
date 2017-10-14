var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var mongodb = require('mongodb');
var bcrypt = require('bcrypt');

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/html', 'login.html'));
});

router.post('/', function(req, res) {

  //form validation
  req.checkBody('username', 'Username field cannot be empty.').notEmpty();
  req.checkBody('password', 'Password field cannot be empty.').notEmpty();

  var errors = req.validationErrors();

  var msg = '';

  if (errors) {
    console.log('errors: ');
    errors.forEach(function(error) {
      console.log(error.msg);
      msg += error.msg;
    });
    res.send('errors: ' + msg);
    //res.redirect('/');
  } else {

    //if form validated - database connection
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/min-express-srv';

    MongoClient.connect(url, function(err, db) {
      if (err) {
        console.log('Connection error:', err);
      } else {
        console.log('Successful connection');

        var collection = db.collection('users');

        collection.findOne({
          username: req.body.username
        }, function(err, doc) {
          if (err) {
            console.log('Find error: ', err);
          } else if (!doc) {
            console.log('User not found');
            res.redirect('/register');
            db.close();
          } else {

            //password verification
            bcrypt.compare(req.body.password, doc.password, function(err, result) {
              // res == true
              if (result) {
                if (doc.role === 'admin') {
                  res.redirect('/admin');
                } else {
                  res.redirect('/profile');
                }
              } else {
                res.sendStatus(401);
              }
            });
            db.close();
          }
        });
      }
    })

  }
})

module.exports = router;
