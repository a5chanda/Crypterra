var http = require('http');
var express = require('express');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const BusinessNetworkDefinition = require('composer-common').BusinessNetworkDefinition;
var bodyParser = require('body-parser');
var app = express();
let factory;
let companyRegistry;
let personRegistry;
let businessNetworkDefinition;
app.use('/', express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.listen(3000);
let bizNetConnection = new BusinessNetworkConnection();
(async () => {
  businessNetworkDefinition = await bizNetConnection.connect('admin@deloitte-chain'); 
  factory = await businessNetworkDefinition.getFactory();
  let transactionRegistry = await connection.getAssetRegistry('org.deloitte.net.Transactions');
 companyRegistry = await connection.getParticipantRegistry('org.deloitte.net.Company');
personRegistry = await connection.getParticipantRegistry('org.deloitte.net.Employee');

})();
//let businessNetworkDefinition; 

app.post('/admin', function(req, res) {
  var data = req.body.data;
  var retVal = addCompany(data);
  res.json(retVal);
});

app.post('/excel', function(req, res) {
  var sheet = req.body.data.sheets.sheet1;
  var length = sheet.length;
  var ledger = [];
  for(var i = 0; i < length; i++) {
    ledger[i] = addTransaction(sheet[i]);
  }
  res.json(ledger);
});

function addCompany(data) {
  var company = factory.newResource('org.deloitte.net', 'Company', data.id);
  company.companyName = data.companyName;
  company.companyID = data.id;
  company.ceo = addemployee(data.ceo);
  var length = data.employeeCount;
  company.employeeCount = length;
  for(var i = 0; i < length; i++) {
    company.employees[i] = addEmployee(data.employees[i]);
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
  return data.id;
}

function addEmployee(data) {
  var employee = factory.newResource('org.deloitte.net', 'Employee', data.id);
  employee.employeeID = data.id;
  employee.firstName = data.firstName;
  employee.lastName = data.lastName;
  employeeRegistry.add(employee);
  return data.id;
}

function addTransaction(data) {
  var transaction = factory.newResource('org.deloitte.net', 'Transaction', data.id);
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
