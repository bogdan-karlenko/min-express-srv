var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var mongodb = require('mongodb');
var bcrypt = require('bcrypt');

var saltRounds = 10;

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/html', 'register.html'));
});

router.post('/newuser', function(req, res, next) {

  //form validation
  req.checkBody('username', 'Username field cannot be empty.').notEmpty();
  req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
  req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
  req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
  req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
  req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
  req.checkBody('passwordMatch', 'Password must be between 8-100 characters long.').len(8, 100);
  req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password);

  // Additional validation to ensure username is alphanumeric with underscores and dashes
  req.checkBody('username', 'Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');

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

        var usr = req.body.username;
        var email = req.body.email;
        var pwd = req.body.password;

        //check for user exists
        collection.count({
          username: usr
        }, function(err, doc) {
          if (err) {
            console.log(err);
          } else if (doc !== 0) {
            console.log('User already exists');
            db.close();
          } else {

            //adding user
            //password hashing
            bcrypt.hash(pwd, saltRounds, function(err, hash) {
              collection.insert({
                username: usr,
                email: email,
                password: hash,
                role: 'user'
              }, function(err) {
                if (err) {
                  console.log('Write error: ', err);
                } else {
                  console.log('Write sucessful');

                  //requesting new user info
                  collection.findOne({
                    username: usr
                  }, function(err, doc) {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log(doc);
                    }
                  });

                  db.close();
                }
              })
            });
          }
        })
      }

    });
  }

  res.redirect('/login');
});

module.exports = router;
