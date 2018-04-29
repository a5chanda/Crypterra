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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { AccountComponent } from './Account/Account.component';


  import { EmployeeComponent } from './Employee/Employee.component';
  import { CompanyComponent } from './Company/Company.component';


  import { btcTransactionComponent } from './btcTransaction/btcTransaction.component';
  import { ethTransactionComponent } from './ethTransaction/ethTransaction.component';
  import { usdTransactionComponent } from './usdTransaction/usdTransaction.component';
  import { cadTransactionComponent } from './cadTransaction/cadTransaction.component';
  import { gbpTransactionComponent } from './gbpTransaction/gbpTransaction.component';  
const routes: Routes = [
     //{ path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'Account', component: AccountComponent},
    
    
      { path: 'Employee', component: EmployeeComponent},
      
      { path: 'Company', component: CompanyComponent},
      
      
        { path: 'btcTransaction', component: btcTransactionComponent},
        
        { path: 'ethTransaction', component: ethTransactionComponent},
        
        { path: 'usdTransaction', component: usdTransactionComponent},
        
        { path: 'cadTransaction', component: cadTransactionComponent},
        
        { path: 'gbpTransaction', component: gbpTransactionComponent},
        
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
