var http = require('http');
var express = require('express');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
var bodyParser = require('body-parser');
var app = express();
var accounts = [];
var count = 0;
var NS = 'org.deloitte.net';
let factory, accountId, businessNetworkDefinition, bitcoinRegistry,
ethereumRegistry, canadaRegistry, americaRegistry, britainRegistry, accountRegistry,  companyRegistry, personRegistry;

app.use('/', express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.listen(3000);
let connection = new BusinessNetworkConnection();
(async () => {
  businessNetworkDefinition = await connection.connect('admin@deloitte-net');
  factory = businessNetworkDefinition.getFactory();
  bitcoinRegistry = await connection.getTransactionRegistry('org.deloitte.net.btcTransaction');
  ethereumRegistry = await connection.getTransactionRegistry('org.deloitte.net.ethTransaction');
  canadaRegistry = await connection.getTransactionRegistry('org.deloitte.net.cadTransaction');
  americaRegistry = await connection.getTransactionRegistry('org.deloitte.net.usdTransaction');
  britainRegistry = await connection.getTransactionRegistry('org.deloitte.net.gbpTransaction');
  companyRegistry = await connection.getParticipantRegistry('org.deloitte.net.Company');
  personRegistry = await connection.getParticipantRegistry('org.deloitte.net.Employee');
  accountRegistry = await connection.getAssetRegistry('org.deloitte.net.Account');
})().catch(function(err) {
  console.log(err);
});

app.post('/admin', function(req, res) {
  var companyData = req.body;
  console.log(companyData);
  accountID = 'a' + addCompany(companyData);
  /*var sheet = req.body.transactions;
  var length = sheet.length;
  for(var i = 0; i < length; i++) {
    addTransaction(sheet[i]);
  }*/
  res.end('Success!');
});

async function addCompany(data) {
  var accountID = 'a' + data.ID;
  var account = await factory.newResource(NS, 'Account', accountID);
  account.AccountID = accountID;
  account.ownerID = data.ID;
  account.balanceBTC = parseFloat(data.btcBalance);
  account.balanceETH = parseFloat(data.ethBalance);
  account.balanceCAD = parseFloat(data.cadBalance);
  account.balanceUSD = parseFloat(data.usdBalance);
  account.balanceGBP = parseFloat(data.gbpBalance);
  var company = await factory.newResource(NS, 'Company', data.ID);
  company.companyName = data.name;
  company.companyID = data.ID;
  company.ceo = data.ceo;
  company.description = data.description;
  company.location = data.location;
  var length = 0;//company.employees.length;
  company.employees = [];
  for(var i = 0; i < length; i++) {
    company.employees[i] = addEmployee(data.employees[i]);
  }
  var length2 = 0;//data.subsidiaries.length;
  company.subsidiaries = [];
  for(var i = 0; i < length2; i++) {
    company.subsidiaries[i] = addCompany(data.subsidiaries[i]);
  }
  account.owner = 'Company';
  company.acc = await factory.newRelationship(NS, 'Account', account.$identifier);;
  accounts[count] = account;
  ++count;
  await companyRegistry.add(company).catch(function(err) {
    console.log(err);
  });
  await accountRegistry.add(account).catch(function(err) {
    console.log(err);
  });
  return data.ID;
}

async function addEmployee(data) {
  var account = await factory.newResource(NS, 'Account', accountID);
  var accountID = 'a' + data.ID;
  account.ownerID = data.ID;
  account.AccountID = accountID;
  account.balanceBTC = parseFloat(data.btcBalance);
  account.balanceETH = parseFloat(data.ethBalance);
  account.balanceCAD = parseFloat(data.cadBalance);
  account.balanceUSD = parseFloat(data.usdBalance);
  account.balanceGBP = parseFloat(data.gbpBalance);
  var employee = await factory.newResource(NS, 'Employee', data.ID);
  employee.employeeID = data.ID;
  employee.firstName = data.firstName;
  employee.lastName = data.lastName;
  employee.position = data.Position;
  employee.salary = parseFloat(data.Salary);
  account.owner = 'Employee';
  company.acc = await factory.newRelationship(NS, 'Account', account.$identifier);
  accounts[count] = account;
  ++count;
  await employeeRegistry.add(employee).catch(function(err) {
    console.log(err);
  });
  await accountRegistry.add(account).catch(function(err) {
    console.log(err);
  });
  return data.ID;
}

async function addTransaction(data) {
  var transaction;
  var currency;
  if(data.Debit.length > 0)
    currency = data.Debit.slice(-3);
  else
    currency = data.Credit.slice(-3);
  if(currency.toUpperCase() === 'BTC')
    transaction = await factory.newResource(NS, 'btcTransaction', data.ID);
  else if(currency.toUpperCase() === 'ETH')
    transaction = await factory.newResource(NS, 'ethTransaction', data.ID);
  else if(currency.toUpperCase() === 'CAD')
    transaction = await factory.newResource(NS, 'cadTransaction', data.ID);
  else if(currency.toUpperCase() === 'USD')
    transaction = await factory.newResource(NS, 'usdTransaction', data.ID);
  else if(currency.toUpperCase() === 'GBP')
    transaction = await factory.newResource(NS, 'gbpTransaction', data.ID);
  transaction.transactionID = data.ID;
  transaction.date = data.Date;
  transaction.description = data.Description;
  if(data.Debit.length > 0) {
    transaction.from = await factory.newRelationship(NS, 'Account', accountID);
    transaction.to = await factory.newRelationship(NS, 'Account', data.participantID);
    transaction.amount = parseFloat(data.Debit.slice(1, -3));
  }
  else {
    transaction.from = await factory.newRelationship(NS, 'Account', data.participantID);
    transaction.to = await factory.newRelationship(NS, 'Account', data.accountID);
    transaction.amount = parseFloat(data.Credit.slice(1, -3));
  }
  if(currency.toUpperCase() === 'BTC')
    await bitcoinRegistry.add(transaction);
  else if(currency.toUpperCase() === 'ETH')
    await ethereumRegistry.add(transaction);
  else if(currency.toUpperCase() === 'CAD')
    await canadaRegistry.add(transaction);
  else if(currency.toUpperCase() === 'USD')
    await americaRegistry.add(transaction);
  else if(currency.toUpperCase() === 'GBP')
    await britainRegistry.add(transaction);
}