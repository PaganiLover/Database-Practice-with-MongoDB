var mongo = require('mongodb');
var assert = require('assert');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require("path");
var server = require('http').createServer(app);
var hbs = require('express-handlebars');

var url = "mongodb://localhost:27017/project";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static( __dirname + '/public'));

// view engine setup
app.engine('hbs', hbs({extname: 'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// include routes
var routes = require('./routes/index');
app.use('/', routes);

app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

server.listen('3000', function() {
  console.log('Your server is listening to port 3000');
});
