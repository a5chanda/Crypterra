var http = require('http');
var request = require('request');
var express = require('express');
var excel = require('excel-as-json').processFile;
var bodyParser = require('body-parser');
var app = express();

app.use('/', express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.listen(3000);

app.post('/transactions', function(req, res){
  var src = req.body;
  var dst = {};
  var options = {sheet:'1',
    isColOriented: false,
    omitEmtpyFields: false};
  convertExcel(src, dst, options, null);
  res.json(dst);
});
