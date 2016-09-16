var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));
app.set('views', __dirname + '/views');

exports.app = app;