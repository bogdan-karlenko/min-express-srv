var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var path = require('path');
var mongodb = require('mongodb');

router.post('/', function(req, res) {

  req.checkBody('username', 'Username field cannot be empty.').notEmpty();
  req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
  //req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
  //req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
  //req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
  //req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
  //req.checkBody('passwordMatch', 'Password must be between 8-100 characters long.').len(8, 100);
  //req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password);

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

            if (doc.password === req.body.password) {
              if (doc.role === 'admin') {
                res.redirect('/admin');
              } else {
                res.redirect('/home');
              }
            } else {
              res.sendStatus(401);
            }

            db.close();
          }
        });
      }
    })

  }

  // if (user.username === 'admin' && user.password === 'admin') {
  //   res.sendFile(path.join(__dirname, '../public', 'admin.html'))
  //     //res.redirect('/admin');
  //     // res.send({redirect: '/admin'});
  // } else {
  //   res.sendStatus(401);
  // }
})

module.exports = router;
