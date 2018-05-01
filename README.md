# Crypterra

One Paragraph of project description goes here

## Setup

### Prerequisites

### 1. Clone the git repository

```
git clone https://github.com/Deloitte-Case-Competition/Crypterra

```
### 2. Setting Up Fabric for the Platform


Remove all pre-existing docker instances 

```
docker kill $(docker ps -q)
docker rm $(docker ps -aq)
docker rmi $(docker images dev-* -q)

```
Install Fabric scripts which are available in fabric-tools

```
cd fabric-tools/
./downloadFabric.shc
./startFabric.sh
./createPeerAdminCard.sh

```
### 3. Set up the Business Network Archive (.bna file)
Generate BNA file from the root directory

```
cd ..
npm install

```
A new file called deloitte-net@0.1.15.bna has been created in the root directory
 
### 4. Deploying to Fabric

```
composer network install --card PeerAdmin@hlfv1 --archiveFile deloitte-net@0.1.15.bna
composer network start --networkName deloitte-net --networkVersion 0.1.15 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
composer card import --file networkadmin.card
composer network ping --card admin@deloitte-net

```
### 5. Run Application

```
node server.js
npm install  
cd ../angular-app/deloitte-net
npm start

```

The Node application will be running at localhost:3000 (for data input).

The Angular application will be running at localhost:4200 (for viewing added transactions, participants, and assets) 

### 6. Stopping the app
At the end of your session, stop fabric:

```
cd ~/fabric-tools
./stopFabric.sh
./teardownFabric.sh

```

## Authors

* **Abhinav Chanda** - *Blockchain Developer* - [a5chanda](https://github.com/a5chanda)
* **Ryan Min** - *Back-end Developer* - [ryanmin42](https://github.com/ryanmin42) 
* **Meihua LI** - *Front-end Developer* - [itsmeihua](https://github.com/itsmeihua)  
* **Vishv Patel** - *Financial Analyst* - [VishvPatel007](https://github.com/VishvPatel007)
* **Niaz Abedini** - *Business Analyst* - [nniiaazz](https://github.com/nniiaazz) 
