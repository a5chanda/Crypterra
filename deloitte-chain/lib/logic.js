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
function btcTransaction(btcTransferAccount){
    if(btcTransferAccount.from.balance < btcTransferAccount.amountBTC){
        throw new Error ("Insufficient funds");
    }
    else{
        btcTransferAccount.from.balanceBTC -= btcTransferAccount.amountBTC;
        btcTransferAccount.to.balanceBTC += btcTransferAccount.amountBTC;

        return getAssetRegistry('org.deloitte.net.btcAccount').then (function (assetRegistry) {
            return assetRegistry.update(btcTransferAccount.from);
        })
        .then (function (){
        return getAssetRegistry('org.deloitte.net.btcAccount');
        })
        .then(function (assetRegistry) {
        return assetRegistry.update(btcTransferAccount.to);
        });
    }
}

/**
 * ETHEREUM transaction
 * @param {org.deloitte.net.ethTransaction} ethTransaction
 * @transaction
 */
function ethTransaction(ethTransferAccount) {
    if(ethTransferAccount.from.balance < ethTransferAccount.amountETH){
        throw new Error ("Insufficient funds");
    }
    else{
        ethTransferAccount.from.balanceETH -= ethTransferAccount.amountETH;
        ethTransferAccount.to.balanceETH += ethTransferAccount.amountETH;

        return getAssetRegistry('org.deloitte.net.ethAccount').then (function (assetRegistry) {
            return assetRegistry.update(ethTransferAccount.from);
        })
        .then (function () {
        return getAssetRegistry('org.deloitte.net.ethAccount');
        })
        .then(function (assetRegistry) {
        return assetRegistry.update(ethTransferAccount.to);
        });
    }
}


/**
 * USD transaction
 * @param {org.deloitte.net.usdTransaction} usdTransaction
 * @transaction
 */
function usdTransaction(usdTransferAccount) {
    if(usdTransferAccount.from.balance < usdTransferAccount.amountUSD){
        throw new Error ("Insufficient funds");
    }
    else{
        usdTransferAccount.from.balanceUSD -= usdTransferAccount.amountUSD;
        usdTransferAccount.to.balanceUSD += usdTransferAccount.amountUSD;

        return getAssetRegistry('org.deloitte.net.usdAccount').then (function (assetRegistry) {
            return assetRegistry.update(usdTransferAccount.from);
        })
        .then (function () {
        return getAssetRegistry('org.deloitte.net.usdAccount');
        })
        .then(function (assetRegistry) {
        return assetRegistry.update(usdTransferAccount.to);
        });
    }
}


/**
 * CAD transaction
 * @param {org.deloitte.net.cadTransaction} cadTransaction
 * @transaction
 */
function cadTransaction(cadTransferAccount) {
    if(cadTransferAccount.from.balance < cadTransferAccount.amountCAD){
        throw new Error ("Insufficient funds");
    }
    else{
        cadTransferAccount.from.balanceCAD -= cadTransferAccount.amountCAD;
        cadTransferAccount.to.balanceCAD += cadTransferAccount.amountCAD;

        return getAssetRegistry('org.deloitte.net.cadAccount').then (function (assetRegistry) {
            return assetRegistry.update(cadTransferAccount.from);
        })
        .then (function () {
        return getAssetRegistry('org.deloitte.net.cadAccount');
        })
        .then(function (assetRegistry) {
        return assetRegistry.update(cadTransferAccount.to);
        });
    }
}

/**
 * GBP transaction
 * @param {org.deloitte.net.gbpTransaction} gbpTransaction
 * @transaction
 */
function gbpTransaction(gbpTransferAccount) {
    if(gbpTransferAccount.from.balance < gbpTransferAccount.amountGBP){
        throw new Error ("Insufficient funds");
    }
    else{
        gbpTransferAccount.from.balanceGBP -= gbpTransferAccount.amountGBP;
        gbpTransferAccount.to.balanceGBP += gbpTransferAccount.amountGBP;

        return getAssetRegistry('org.deloitte.net.gbpAccount').then (function (assetRegistry) {
            return assetRegistry.update(gbpTransferAccount.from);
        })
        .then (function () {
        return getAssetRegistry('org.deloitte.net.gbpAccount');
        })
        .then(function (assetRegistry) {
        return assetRegistry.update(gbpTransferAccount.to);
        });
    }
}