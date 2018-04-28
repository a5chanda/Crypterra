var http = require('http');
var express = require('express');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const BusinessNetworkDefinition = require('composer-common').BusinessNetworkDefinition;
var bodyParser = require('body-parser');
var app = express();
let factory;
var companyId;
let companyRegistry;
let personRegistry;
let businessNetworkDefinition;
let bitcoinRegistry;
let ethereumRegistry;
let canadaRegistry;
let americaRegistry;
let britainRegistry;

app.use('/', express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.listen(3000);
let bizNetConnection = new BusinessNetworkConnection();
(async () => {
  businessNetworkDefinition = await bizNetConnection.connect('../admin@deloitte-chain');
  factory = businessNetworkDefinition.getFactory();
  bitcoinRegistry = await connection.getTransactionRegistry('org.deloitte.net.btcTransaction');
  ethereumRegistry = await connection.getTransactionRegistry('org.deloitte.net.ethTransaction');
  canadaRegistry = await connection.getTransactionRegistry('org.deloitte.net.cadTransaction');
  americaRegistry = await connection.getTransactionRegistry('org.deloitte.net.usdTransaction');
  britainRegistry = await connection.getTransactionRegistry('org.deloitte.net.gbpTransaction');
  companyRegistry = await connection.getParticipantRegistry('org.deloitte.net.Company');
  personRegistry = await connection.getParticipantRegistry('org.deloitte.net.Employee');
})().catch(function(err) {
  console.log(err);
});

app.post('/admin', function(req, res) {
  var companyData = req.body.company;
  companyId = addCompany(companyData);
  var sheet = req.body.sheet;
  var length = sheet.length;
  for(var i = 0; i < length; i++) {
    addTransaction(sheet[i]);
  }
});

function addCompany(data) {
  var company = factory.newResource('org.deloitte.net', 'Company', data.id);
  company.companyName = data.companyName;
  company.companyId = data.id;
  company.netWorth = parseFloat(data.netWorth);
  company.ceo = data.ceo;
  company.description = data.description;
  company.location = data.location;
  company.btcBalance = parseFloat(data.btcBalance);
  company.ethBalance = parseFloat(data.ethBalance);
  company.cadBalance = parseFloat(data.cadBalance);
  company.usdBalance = parseFloat(data.usdBalance);
  company.gbpBalance = parseFloat(data.gbpBalance);
  var length = company.employees.length;
  for(var i = 0; i < length; i++) {
    company.employees[i] = addEmployee(data.employees[i]);
  }
  var length2 = data.subsidiaries.length;
  for(var i = 0; i < length2; i++) {
    company.subsidiaries[i] = addCompany(data.subsidiaries[i]);
  }
  companyRegistry.add(company);
  return data.id;
}

function addEmployee(data) {
  var employee = factory.newResource('org.deloitte.net', 'Employee', data.Id);
  employee.employeeID = data.Id;
  employee.firstName = data.firstName;
  employee.lastName = data.lastName;
  employee.position = data.Position;
  employee.salary = parseFloat(data.Salary);
  employee.btcBalance = parseFloat(data.btcBalance);
  employee.ethBalance = parseFloat(data.ethBalance);
  employee.cadBalance = parseFloat(data.cadBalance);
  employee.usdBalance = parseFloat(data.usdBalance);
  employee.gbpBalance = parseFloat(data.gbpBalance);
  employeeRegistry.add(employee);
  return data.Id;
}

function addTransaction(data) {
  var transaction;
  var currency;
  if(data.Debit.length > 0)
    currency = data.Debit.slice(-3);
  else
    currency = data.Credit.slice(-3);
  if(currency.toUpperCase() === 'BTC')
    transaction = factory.newResource('org.deloitte.net', 'btcTransaction', data.Id);
  else if(currency.toUpperCase() === 'ETH')
    transaction = factory.newResource('org.deloitte.net', 'ethTransaction', data.Id);
  else if(currency.toUpperCase() === 'CAD')
    transaction = factory.newResource('org.deloitte.net', 'cadTransaction', data.Id);
  else if(currency.toUpperCase() === 'USD')
    transaction = factory.newResource('org.deloitte.net', 'usdTransaction', data.Id);
  else if(currency.toUpperCase() === 'GBP')
    transaction = factory.newResource('org.deloitte.net', 'gbpTransaction', data.Id);
  transaction.transactionID = data.Id;
  transaction.date = data.Date;
  if(data.Debit.length > 0) {
    transaction.from = companyID;
    transaction.to = data.ParticipantId;
    transaction.amount = data.Debit.slice(1, -3);
  }
  else {
    transaction.from = data.ParticipantId;
    transaction.to = companyID;
    transaction.amount = data.Credit.slice(1, -3);
  }
  transaction.description = data.Description;
  if(currency.toUpperCase() === 'BTC')
    bitcoinRegistry.add(transaction);
  else if(currency.toUpperCase() === 'ETH')
    ethereumRegistry.add(transaction);
  else if(currency.toUpperCase() === 'CAD')
    canadaRegistry.add(transaction);
  else if(currency.toUpperCase() === 'USD')
    americaRegistry.add(transaction);
  else if(currency.toUpperCase() === 'GBP')
    britainRegistry.add(transaction);
}
