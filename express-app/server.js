var express = require('express');
var app = express();

// create a route
app.get('/', function (req, res) {
 res.send('Hello World!');
});
var nameList= [];
var name = "";
//create a route that will take different username
app.get('/greetings/:username', function(req, res){
var username = req.params.username;
  nameList.push(username);
  res.send("Hello : " + req.params.username);
});

app.get('/greeted', function (req, res) {
 res.send(nameList);
 for (var i = 0; i < nameList.length; i++) {
   var greetedName = nameList[i];
 console.log(greetedName);
 }
});

//start the server
var server = app.listen(3000, function () {
 var host = server.address().address;
 var port = server.address().port;

 console.log('node server.js', host, port);

});
