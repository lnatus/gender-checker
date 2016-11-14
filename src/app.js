var mongoose = require('mongoose');
var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');

var api = require('./routes/api');

var options = {
   key: fs.readFileSync('../cert/key.pem'),
   cert: fs.readFileSync('../cert/cert.pem')
};

var app = express();

app.get('/', api.read);

mongoose.connect('mongodb://localhost/gcdb');

http.createServer(app).listen(3000);
https.createServer(options, app).listen(8000);