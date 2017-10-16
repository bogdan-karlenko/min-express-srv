var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var mongodb = require('mongodb');
var bcrypt = require('bcrypt');

//Authentification Packages
var session = require('express-session');
var passport = require('passport');

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

            var user_id = doc._id;

            //password verification
            bcrypt.compare(req.body.password, doc.password, function(err, result) {
              // res == true
              if (result) {
                req.login(user_id, function(err) {
                  if (doc.role === 'admin') {
                    res.redirect('/admin');
                  } else {
                    res.redirect('/profile');
                  }
                })
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
passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
  //  User.findById(id, function(err, user) {
  done(null, user_id);
  // });
});


module.exports = router;
