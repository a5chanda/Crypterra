var http = require('http');
var express = require('express');
const BusinessNetworkConnection = require('composer-common').BusinessNetworkConnection;
var bodyParser = require('body-parser');
var app = express();
this.bizNetworkConnection = new BusinessNetworkConnection();
this.businessNetworkDefinition = this.bizNetworkConnection.connect('admin@deloitte-chain');
let factory = getFactory();
let transactionRegistry = this.bizNetworkConnection.getAssetRegistry('net.biz.digitalPropertyNetwork.Transactions');
let companyRegistry = this.bizNetworkConnection.getParticipantRegistry('net.biz.digitalPropertyNetwork.Company');
let personRegistry = this.bizNetworkConnection.getParticipantRegistry('net.biz.digitalPropertyNetwork.Person');

app.use('/', express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.listen(3000);

app.post('/excel', function(req, res) {
  var sheet = req.body.data.sheets.sheet1;
  var length = sheet.length;
  var ledger = [];
  for(var i = 0; i < length; i++) {
    ledger[i] = addTransaction(sheet[i]);
  }
  res.json(ledger);
});


app.post('/admin', function(req, res) {
  var data = req.body.data;
  var retVal = addCompany(data);
  res.json(retVal);
});

function addCompany(data) {
  var company = factory.newResource('', 'Company', data.id);
  company.name = data.name;
  company.ceo = addPerson(data.ceo);
  var length = data.employeeCount;
  company.employeeCount = length;
  for(var i = 0; i < length; i++) {
    company.employees[i] = addPerson(data.employees[i]);
  }
  company.description = data.description;
  var length2 = data.subsidiaryCount;
  company.subsidiaryCount = length2;
  for(var i = 0; i < length2; i++) {
    company.subsidiaries[i] = addCompany(data.subsidiaries[i]);
  }
  company.location = data.location;
  company.cashBalance = data.cashBalance;
  companyRegistry.add(company);
  return company;
}

function addPerson(data) {
  var person = factory.newResource('net.biz.digitalPropertyNetwork', 'Person', data.id);
  person.name = data.name;
  person.title = data.title;
  person.salary = data.salary;
  personRegistry.add(person);
  return person;
}

function addTransaction(data) {
  var transaction = factory.newResource('net.biz.digitalPropertyNetwork', 'Transaction', data.id);
  transaction.date = data.date;
  transaction.sender = data.sender;
  transaction.amount = data.amount;
  transaction.sentCurrency = data.sentCurrency;
  transaction.receiver = data.receiver;
  transaction.receivingCurrency = data.receivingCurrency;
  transaction.description = data.description;
  transactionRegistry.add(transaction);
  return transaction;
}
