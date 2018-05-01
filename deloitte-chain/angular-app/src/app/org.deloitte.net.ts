import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.deloitte.net{
   export class Employee extends Participant {
      employeeID: string;
      firstName: string;
      lastName: string;
      position: string;
      salary: number;
      acc: Account;
   }
   export class Company extends Participant {
      companyName: string;
      companyID: string;
      employees: string[];
      location: string;
      description: string;
      ceo: string;
      subsidiaries: string[];
      acc: Account;
   }
   export enum Owner {
      Company,
      Employee,
   }
   export class Account extends Asset {
      AccountID: string;
      owner: Owner;
      ownerID: string;
      balanceBTC: number;
      balanceETH: number;
      balanceUSD: number;
      balanceCAD: number;
      balanceGBP: number;
   }
   export class btcTransaction extends Transaction {
      from: Account;
      to: Account;
      amount: number;
      transactionID: string;
      date: string;
      description: string;
   }
   export class ethTransaction extends Transaction {
      from: Account;
      to: Account;
      amount: number;
      transactionID: string;
      date: string;
      description: string;
   }
   export class usdTransaction extends Transaction {
      from: Account;
      to: Account;
      amount: number;
      transactionID: string;
      date: string;
      description: string;
   }
   export class cadTransaction extends Transaction {
      from: Account;
      to: Account;
      amount: number;
      transactionID: string;
      date: string;
      description: string;
   }
   export class gbpTransaction extends Transaction {
      from: Account;
      to: Account;
      amount: number;
      transactionID: string;
      date: string;
      description: string;
   }
// }
