var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

//Authentification Packages
var session = require('express-session');
var passport = require('passport');

var mongo = require('mongodb');

var index = require('./routes/index');

var app = express();

var port = 8880;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(expressValidator());

app.use(session({
  secret: 'fskjldgsfddgsh',
  resave: false,
  saveUninitialized: true,
  // cookie: {
  //   secure: true
  // }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/login', require('./routes/login'));
app.use('/admin', require('./routes/admin'));
app.use('/register', require('./routes/register'));
app.use('/profile', require('./routes/profile'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/html', 'index.html'));
})

app.listen(port, function() {
  console.log('\n--------------------\nServer is running\n');
  console.log('http://localhost:' + port);
  console.log('\n\nPress Ctrl+C to stop\n--------------------\n');
});
