var mongoose = require('mongoose');
var express = require('express');
var https = require('https');
var http = require('http');
var path = require('path');
var fs = require('fs');

var env = require('./config/env');
var api = require('./routes/api');

/* 
	dev or production build 
	mode configurable in config/env.js
*/

var build = env[env.mode];

var options = {
   key: fs.readFileSync(path.join(__dirname, '../cert') + '/key.pem'),
   cert: fs.readFileSync(path.join(__dirname, '../cert') + '/cert.pem')
};

var app = express();

app.get('/', api.read);
app.get('*', api.notFound);

mongoose.connect(build.mongoDBConnection);

http.createServer(app).listen(build.httpPort);
https.createServer(options, app).listen(build.httpsPort);