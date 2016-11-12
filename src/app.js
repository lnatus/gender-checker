var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');

var options = {
   key: fs.readFileSync('../cert/key.pem'),
  cert: fs.readFileSync('../cert/cert.pem')
};

var app = express();

app.get('/', function(req, res){
  res.send('Welcome to gender checker...');
});

http.createServer(app).listen(3000);
https.createServer(options, app).listen(8000);