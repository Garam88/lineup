// Server-side: app.js  
var express    = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
var dbPool = require('./dbPool.js');
process.setMaxListeners(0);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.set('views', __dirname + '/html');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.listen(process.env.PORT || 5000, function () {
  console.log('Example app listening on port 5000!');
});

app.use(session({
  secret : 'Dksldhlwrnasjd12askdjlh3123DHFLK',
  resave: false,
  saveUninitialized: true
}));

var service = require('./service.js')(app, dbPool);