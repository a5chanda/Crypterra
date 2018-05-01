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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { cadTransactionService } from './cadTransaction.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-cadTransaction',
	templateUrl: './cadTransaction.component.html',
	styleUrls: ['./cadTransaction.component.css'],
  providers: [cadTransactionService]
})
export class cadTransactionComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
	private errorMessage;

  
      
          from = new FormControl("", Validators.required);
        
  
      
          to = new FormControl("", Validators.required);
        
  
      
          amount = new FormControl("", Validators.required);
        
  
      
          transactionID = new FormControl("", Validators.required);
        
  
      
          date = new FormControl("", Validators.required);
        
  
      
          description = new FormControl("", Validators.required);
        
  
      
          transactionId = new FormControl("", Validators.required);
        
  
      
          timestamp = new FormControl("", Validators.required);
        
  


  constructor(private servicecadTransaction:cadTransactionService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          from:this.from,
        
    
        
          to:this.to,
        
    
        
          amount:this.amount,
        
    
        
          transactionID:this.transactionID,
        
    
        
          date:this.date,
        
    
        
          description:this.description,
        
    
        
          transactionId:this.transactionId,
        
    
        
          timestamp:this.timestamp
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.servicecadTransaction.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the transaction field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: "org.deloitte.net.cadTransaction",
      
        
          "from":this.from.value,
        
      
        
          "to":this.to.value,
        
      
        
          "amount":this.amount.value,
        
      
        
          "transactionID":this.transactionID.value,
        
      
        
          "date":this.date.value,
        
      
        
          "description":this.description.value,
        
      
        
          "transactionId":this.transactionId.value,
        
      
        
          "timestamp":this.timestamp.value
        
      
    };

    this.myForm.setValue({
      
        
          "from":null,
        
      
        
          "to":null,
        
      
        
          "amount":null,
        
      
        
          "transactionID":null,
        
      
        
          "date":null,
        
      
        
          "description":null,
        
      
        
          "transactionId":null,
        
      
        
          "timestamp":null
        
      
    });

    return this.servicecadTransaction.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "from":null,
        
      
        
          "to":null,
        
      
        
          "amount":null,
        
      
        
          "transactionID":null,
        
      
        
          "date":null,
        
      
        
          "description":null,
        
      
        
          "transactionId":null,
        
      
        
          "timestamp":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: "org.deloitte.net.cadTransaction",
      
        
          
            "from":this.from.value,
          
        
    
        
          
            "to":this.to.value,
          
        
    
        
          
            "amount":this.amount.value,
          
        
    
        
          
            "transactionID":this.transactionID.value,
          
        
    
        
          
            "date":this.date.value,
          
        
    
        
          
            "description":this.description.value,
          
        
    
        
          
        
    
        
          
            "timestamp":this.timestamp.value
          
        
    
    };

    return this.servicecadTransaction.updateTransaction(form.get("transactionId").value,this.Transaction)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteTransaction(): Promise<any> {

    return this.servicecadTransaction.deleteTransaction(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.servicecadTransaction.getTransaction(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "from":null,
          
        
          
            "to":null,
          
        
          
            "amount":null,
          
        
          
            "transactionID":null,
          
        
          
            "date":null,
          
        
          
            "description":null,
          
        
          
            "transactionId":null,
          
        
          
            "timestamp":null 
          
        
      };



      
        if(result.from){
          
            formObject.from = result.from;
          
        }else{
          formObject.from = null;
        }
      
        if(result.to){
          
            formObject.to = result.to;
          
        }else{
          formObject.to = null;
        }
      
        if(result.amount){
          
            formObject.amount = result.amount;
          
        }else{
          formObject.amount = null;
        }
      
        if(result.transactionID){
          
            formObject.transactionID = result.transactionID;
          
        }else{
          formObject.transactionID = null;
        }
      
        if(result.date){
          
            formObject.date = result.date;
          
        }else{
          formObject.date = null;
        }
      
        if(result.description){
          
            formObject.description = result.description;
          
        }else{
          formObject.description = null;
        }
      
        if(result.transactionId){
          
            formObject.transactionId = result.transactionId;
          
        }else{
          formObject.transactionId = null;
        }
      
        if(result.timestamp){
          
            formObject.timestamp = result.timestamp;
          
        }else{
          formObject.timestamp = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "from":null,
        
      
        
          "to":null,
        
      
        
          "amount":null,
        
      
        
          "transactionID":null,
        
      
        
          "date":null,
        
      
        
          "description":null,
        
      
        
          "transactionId":null,
        
      
        
          "timestamp":null 
        
      
      });
  }

}

