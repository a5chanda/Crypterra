var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use('/', express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.listen(3000);

app.post('/excel', function(req, res) {
  var data = JSON.parse(req.body.data);
  console.log(data);
});
