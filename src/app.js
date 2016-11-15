var mongoose = require('mongoose');
var express = require('express');
var https = require('https');
var http = require('http');
var path = require('path');
var fs = require('fs');

var api = require('./routes/api');

var options = {
   key: fs.readFileSync(path.join(__dirname, '../cert') + '/key.pem'),
   cert: fs.readFileSync(path.join(__dirname, '../cert') + '/cert.pem')
};

var app = express();

app.get('/', api.read);

//TODO: Config pev / prod 
mongoose.connect('mongodb://localhost/gcdb');
//mongoose.connect('mongodb://gc_mongoadmin:boo6XoaSha@localhost:21199/admin');

http.createServer(app).listen(61000);
https.createServer(options, app).listen(61001);