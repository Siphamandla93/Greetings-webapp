var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var Models = require('./models/User');
var MongoUrl = process.env.MONGO_DB_URL || "'mongodb://localhost/Siphamandla'";
var models = Models(MongoUrl);




app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


// controller functions

// handles the language selected from the radio buttons
// returns the right language greet in
function manageLanguage(lang) {
    if (lang === "Afrikaans") {
        return "Hallo, "
    } else if (lang === "English") {
        return "Hello, "
    } else if (lang === "Xhosa") {
        return "Molo, "
    }
}

// handles the names that are are greeted
var nameList = [];
var namesObj = {};
var counter = 0;

function manageName(name) {
    if (namesObj[name] === undefined) {
        nameList.push(name);
        namesObj[name] = 1;
        counter++
        return name
    } else {
      return name
    }
}

//create a route that will take different username

app.get('/', function(req, res) {
    res.redirect('/greetings')
});

app.get('/greetings', function(req, res) {
    res.render('add');
});

app.post("/greetings", function(req, res, next) {
    var nameOf = {
        name : req.body.name
    }
    var language = req.body.language;
models.User.create(nameOf, function(err, results){
  if (err) {
    return next(err)
  }
  else {
    console.log(results.name);
  }
});
    //  console.log(name);
    res.render('add', {
        name: manageName(nameOf.name),
        language: manageLanguage(language),
        counter: counter
    });
});

app.get('/greeted', function(req, res) {
    res.render("greeted", {
        Greeted: nameList
    });
});

//creating a route that will count how many time aa person has been greeted
app.get('/counter/:names', function(req, res) {
    var names = req.params.names;

    function CounterNames(input) {
        return input == names;
    }


    var CounterNames = nameList.filter(CounterNames).length;
    var name = "Hello, " + names + ' has been greeted ' + CounterNames + ' times(s)'
    res.render("names", {
      names:name
    });

});
//start the server
// var server = app.listen(3000, function() {
//     var host = server.address().address;
//     var port = server.address().port;
//
//     console.log('node server.js', host, port);
// });

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
