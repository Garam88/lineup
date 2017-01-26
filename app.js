// Server-side: app.js  
var express    = require('express');
var bodyParser = require('body-parser');
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/signin', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  res.send({
   username : username,
   password : password
 });
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});