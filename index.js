var express = require('express');
var app = express();
var http = require('http').Server(app);
 
var path = require('path');
 
const portNumber = process.env.port || 3000;
 
http.listen(portNumber);
 
 
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
 
console.log("server running on port 3000");