var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var login = require('./routes/login');

var app = express();

var port = 8880;

app.use('/', index);
app.use('/login', login);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, function() {
  console.log('\n--------------------\nServer is running\n');
  console.log('http://localhost:' + port);
  console.log('\n\nPress Ctrl+C to stop\n--------------------\n');
});
