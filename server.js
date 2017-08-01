var express = require('express');
var app = express();

// create a route
app.get('/', function (req, res) {
 res.send('Hello World!');
});

app.get('/greetings/:name', function(req, res){
  console.log(req.params.name);
  res.send("Hello : " + req.params.name);
});


//start the server
var server = app.listen(3000, function () {

 var host = server.address().address;
 var port = server.address().port;

 console.log('node server.js', host, port);

});
