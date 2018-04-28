/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Bitcoin transaction
 * @param {org.deloitte.net.btcTransaction} btcTransaction
 * @transaction
 */
function btcTransaction(transaction){
    if(transaction.from.balanceBTC < transaction.amount){
        throw new Error ("Insufficient funds");
    }
    else{
        transaction.from.balanceBTC -= transaction.amount;
        transaction.to.balanceBTC += transaction.amount;

        return getAssetRegistry('org.deloitte.net.Account').then (function (assetRegistry) {
            return assetRegistry.update(transaction.from);
        })
        .then (function (){
        return getAssetRegistry('org.deloitte.net.Account');
        })
        .then(function (assetRegistry) {
        return assetRegistry.update(transaction.to);
        });
    }
}

/**
 * ETHEREUM transaction
 * @param {org.deloitte.net.ethTransaction} ethTransaction
 * @transaction
 */
function ethTransaction(transaction) {
    if(transaction.from.balance < transaction.amountETH){
        throw new Error ("Insufficient funds");
    }
    else{
        transaction.from.balanceETH -= transaction.amountETH;
        transaction.to.balanceETH += transaction.amountETH;

        return getAssetRegistry('org.deloitte.net.Account').then (function (assetRegistry) {
            return assetRegistry.update(transaction.from);
        })
        .then (function () {
        return getAssetRegistry('org.deloitte.net.Account');
        })
        .then(function (assetRegistry) {
        return assetRegistry.update(transaction.to);
        });
    }
}


/**
 * USD transaction
 * @param {org.deloitte.net.usdTransaction} usdTransaction
 * @transaction
 */
function usdTransaction(transaction) {
    if(transaction.from.balance < transaction.amountUSD){
        throw new Error ("Insufficient funds");
    }
    else{
        transaction.from.balanceUSD -= transaction.amountUSD;
        transaction.to.balanceUSD += transaction.amountUSD;

        return getAssetRegistry('org.deloitte.net.Account').then (function (assetRegistry) {
            return assetRegistry.update(transaction.from);
        })
        .then (function () {
        return getAssetRegistry('org.deloitte.net.Account');
        })
        .then(function (assetRegistry) {
        return assetRegistry.update(transaction.to);
        });
    }
}


/**
 * CAD transaction
 * @param {org.deloitte.net.cadTransaction} cadTransaction
 * @transaction
 */
function cadTransaction(transaction) {
    if(transaction.from.balance < transaction.amountCAD){
        throw new Error ("Insufficient funds");
    }
    else{
        transaction.from.balanceCAD -= transaction.amountCAD;
        transaction.to.balanceCAD += transaction.amountCAD;

        return getAssetRegistry('org.deloitte.net.Account').then (function (assetRegistry) {
            return assetRegistry.update(transaction.from);
        })
        .then (function () {
        return getAssetRegistry('org.deloitte.net.Account');
        })
        .then(function (assetRegistry) {
        return assetRegistry.update(transaction.to);
        });
    }
}

/**
 * GBP transaction
 * @param {org.deloitte.net.gbpTransaction} gbpTransaction
 * @transaction
 */
function gbpTransaction(transaction) {
    if(transaction.from.balance < transaction.amountGBP){
        throw new Error ("Insufficient funds");
    }
    else{
        transaction.from.balanceGBP -= transaction.amountGBP;
        transaction.to.balanceGBP += transaction.amountGBP;

        return getAssetRegistry('org.deloitte.net.Account').then (function (assetRegistry) {
            return assetRegistry.update(transaction.from);
        })
        .then (function () {
        return getAssetRegistry('org.deloitte.net.Account');
        })
        .then(function (assetRegistry) {
        return assetRegistry.update(transaction.to);
        });
    }
}