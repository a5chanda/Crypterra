// Require appropriate modules
var http = require('http');
var express = require('express');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
let connection = new BusinessNetworkConnection();
var bodyParser = require('body-parser');
var NS = 'org.deloitte.net';
let factory, accountID, businessNetworkDefinition, bitcoinRegistry,
ethereumRegistry, canadaRegistry, americaRegistry, britainRegistry, accountRegistry,  companyRegistry, personRegistry;

// Set up node server to listen on port 3000
const PORT = 3000;
var app = express();
app.use('/', express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.listen(PORT);

// Initialize network resources inside asynchronous context to allow blocking
(async () => {
  // Connect to Hyperledger network using business card name
  businessNetworkDefinition = await connection.connect('admin@deloitte-net');
  // Generates new resources
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

// Listen for company data from HTML file
app.post('/admin', function(req, res) {
  var companyData = req.body;
  console.log(companyData);
  // Stores Account ID numbers as Company ID numbers preceded by an 'a'
  accountID = 'a' + addCompany(companyData);
  var sheet = req.body.transactions;
  var length = sheet.length;
  for(var i = 0; i < length; i++) {
    addTransaction(sheet[i]);
  }
  res.end('Success!');
});

/**
 * Add a company with provided identifying data to the network.
 * @param {Object} data The data for the added company (i.e. name, CEO, location)
 * @returns {String} The company's ID number on the network.
  */
async function addCompany(data) {
  var aID = 'a' + data.ID;
  // Wrap company balances in Account object to simplify transactions
  var account = await factory.newResource(NS, 'Account', aID);
  account.AccountID = aID;
  account.ownerID = data.ID;
  account.balanceBTC = parseFloat(data.btcBalance.replace(/,/g , '')); // Remove commas from numbers
  account.balanceETH = parseFloat(data.ethBalance.replace(/,/g , ''));
  account.balanceCAD = parseFloat(data.cadBalance.replace(/,/g , ''));
  account.balanceUSD = parseFloat(data.usdBalance.replace(/,/g , ''));
  account.balanceGBP = parseFloat(data.gbpBalance.replace(/,/g , ''));
  var company = await factory.newResource(NS, 'Company', data.ID);
  company.companyName = data.name;
  company.companyID = data.ID;
  company.ceo = data.ceo;
  company.description = data.description;
  company.location = data.location;
  var length = company.employees.length;
  for(var i = 0; i < length; i++) {
    // Keep record of employee ID numbers
    company.employees[i] = addEmployee(data.employees[i]);
  }
  var length2 = data.subsidiaries.length;
  for(var i = 0; i < length2; i++) {
    // Keep record of subsidiary ID numbers
    company.subsidiaries[i] = addCompany(data.subsidiaries[i]);
  }
  account.owner = 'Company';
  // Link owning company with account using identifier
  company.acc = await factory.newRelationship(NS, 'Account', account.$identifier);
  // Add employees and accounts to respective registries
  await companyRegistry.add(company).catch(function(err) {
    console.log(err);
  });
  await accountRegistry.add(account).catch(function(err) {
    console.log(err);
  });
  return data.ID;
}

/**
 * Add an employee with provided identifying data to the network
 * @param {Object} data The data for the added employee (i.e. name, salary, title)
 * @returns {String} The employee's ID number on the network
  */
async function addEmployee(data) {
  var aID = 'a' + data.ID;
  var account = await factory.newResource(NS, 'Account', aID);
  // Account code repeated to ensure modification of local variables and avoid pass by value
  account.ownerID = data.ID;
  account.AccountID = aID;
  account.balanceBTC = parseFloat(data.btcBalance.replace(/,/g , ''));
  account.balanceETH = parseFloat(data.ethBalance.replace(/,/g , ''));
  account.balanceCAD = parseFloat(data.cadBalance.replace(/,/g , ''));
  account.balanceUSD = parseFloat(data.usdBalance.replace(/,/g , ''));
  account.balanceGBP = parseFloat(data.gbpBalance.replace(/,/g , ''));
  var employee = await factory.newResource(NS, 'Employee', data.ID);
  employee.employeeID = data.ID;
  employee.firstName = data.firstName;
  employee.lastName = data.lastName;
  employee.position = data.Position;
  employee.salary = parseFloat(data.Salary);
  account.owner = 'Employee';
  // Link owning company with account using identifier
  employee.acc = await factory.newRelationship(NS, 'Account', account.$identifier);
  // Add employees and accounts to respective registries
  await employeeRegistry.add(employee).catch(function(err) {
    console.log(err);
  });
  await accountRegistry.add(account).catch(function(err) {
    console.log(err);
  });
  return data.ID;
}

/**
 * Add a transaction with provided identifying data to the network
 * @param {Object} data The data for the added transaction (i.e. amount, description, date)
  */
async function addTransaction(data) {
  var transaction;
  var currency;
  if(data.Debit.length > 0)
    currency = data.Debit.slice(-3);
  else
    currency = data.Credit.slice(-3);
  // Create transaction based on currency type
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
  if(data.Debit.length > 0) { // Transfer between different accounts based on debit & credit transaction entries
    transaction.from = await factory.newRelationship(NS, 'Account', accountID);
    transaction.to = await factory.newRelationship(NS, 'Account', data.participantID);
    transaction.amount = parseFloat(data.Debit.slice(1, -3).replace(/,/g , '')); // Remove currency and commas from number
  }
  else {
    transaction.from = await factory.newRelationship(NS, 'Account', data.participantID);
    transaction.to = await factory.newRelationship(NS, 'Account', data.accountID);
    transaction.amount = parseFloat(data.Credit.slice(1, -3).replace(/,/g , ''));
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
