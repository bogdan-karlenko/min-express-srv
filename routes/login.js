var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var mongodb = require('mongodb')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

router.post('/', function(req, res) {
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

  // if (user.username === 'admin' && user.password === 'admin') {
  //   res.sendFile(path.join(__dirname, '../public', 'admin.html'))
  //     //res.redirect('/admin');
  //     // res.send({redirect: '/admin'});
  // } else {
  //   res.sendStatus(401);
  // }
})

module.exports = router;
