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
import { AccountService } from './Account.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Account',
	templateUrl: './Account.component.html',
	styleUrls: ['./Account.component.css'],
  providers: [AccountService]
})
export class AccountComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          AccountID = new FormControl("", Validators.required);
        
  
      
          owner = new FormControl("", Validators.required);
        
  
      
          ownerID = new FormControl("", Validators.required);
        
  
      
          balanceBTC = new FormControl("", Validators.required);
        
  
      
          balanceETH = new FormControl("", Validators.required);
        
  
      
          balanceUSD = new FormControl("", Validators.required);
        
  
      
          balanceCAD = new FormControl("", Validators.required);
        
  
      
          balanceGBP = new FormControl("", Validators.required);
        
  


  constructor(private serviceAccount:AccountService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          AccountID:this.AccountID,
        
    
        
          owner:this.owner,
        
    
        
          ownerID:this.ownerID,
        
    
        
          balanceBTC:this.balanceBTC,
        
    
        
          balanceETH:this.balanceETH,
        
    
        
          balanceUSD:this.balanceUSD,
        
    
        
          balanceCAD:this.balanceCAD,
        
    
        
          balanceGBP:this.balanceGBP
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceAccount.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
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
   * @param {String} name - the name of the asset field to update
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
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.deloitte.net.Account",
      
        
          "AccountID":this.AccountID.value,
        
      
        
          "owner":this.owner.value,
        
      
        
          "ownerID":this.ownerID.value,
        
      
        
          "balanceBTC":this.balanceBTC.value,
        
      
        
          "balanceETH":this.balanceETH.value,
        
      
        
          "balanceUSD":this.balanceUSD.value,
        
      
        
          "balanceCAD":this.balanceCAD.value,
        
      
        
          "balanceGBP":this.balanceGBP.value
        
      
    };

    this.myForm.setValue({
      
        
          "AccountID":null,
        
      
        
          "owner":null,
        
      
        
          "ownerID":null,
        
      
        
          "balanceBTC":null,
        
      
        
          "balanceETH":null,
        
      
        
          "balanceUSD":null,
        
      
        
          "balanceCAD":null,
        
      
        
          "balanceGBP":null
        
      
    });

    return this.serviceAccount.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "AccountID":null,
        
      
        
          "owner":null,
        
      
        
          "ownerID":null,
        
      
        
          "balanceBTC":null,
        
      
        
          "balanceETH":null,
        
      
        
          "balanceUSD":null,
        
      
        
          "balanceCAD":null,
        
      
        
          "balanceGBP":null 
        
      
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


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.deloitte.net.Account",
      
        
          
        
    
        
          
            "owner":this.owner.value,
          
        
    
        
          
            "ownerID":this.ownerID.value,
          
        
    
        
          
            "balanceBTC":this.balanceBTC.value,
          
        
    
        
          
            "balanceETH":this.balanceETH.value,
          
        
    
        
          
            "balanceUSD":this.balanceUSD.value,
          
        
    
        
          
            "balanceCAD":this.balanceCAD.value,
          
        
    
        
          
            "balanceGBP":this.balanceGBP.value
          
        
    
    };

    return this.serviceAccount.updateAsset(form.get("AccountID").value,this.asset)
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


  deleteAsset(): Promise<any> {

    return this.serviceAccount.deleteAsset(this.currentId)
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

    return this.serviceAccount.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "AccountID":null,
          
        
          
            "owner":null,
          
        
          
            "ownerID":null,
          
        
          
            "balanceBTC":null,
          
        
          
            "balanceETH":null,
          
        
          
            "balanceUSD":null,
          
        
          
            "balanceCAD":null,
          
        
          
            "balanceGBP":null 
          
        
      };



      
        if(result.AccountID){
          
            formObject.AccountID = result.AccountID;
          
        }else{
          formObject.AccountID = null;
        }
      
        if(result.owner){
          
            formObject.owner = result.owner;
          
        }else{
          formObject.owner = null;
        }
      
        if(result.ownerID){
          
            formObject.ownerID = result.ownerID;
          
        }else{
          formObject.ownerID = null;
        }
      
        if(result.balanceBTC){
          
            formObject.balanceBTC = result.balanceBTC;
          
        }else{
          formObject.balanceBTC = null;
        }
      
        if(result.balanceETH){
          
            formObject.balanceETH = result.balanceETH;
          
        }else{
          formObject.balanceETH = null;
        }
      
        if(result.balanceUSD){
          
            formObject.balanceUSD = result.balanceUSD;
          
        }else{
          formObject.balanceUSD = null;
        }
      
        if(result.balanceCAD){
          
            formObject.balanceCAD = result.balanceCAD;
          
        }else{
          formObject.balanceCAD = null;
        }
      
        if(result.balanceGBP){
          
            formObject.balanceGBP = result.balanceGBP;
          
        }else{
          formObject.balanceGBP = null;
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
      
        
          "AccountID":null,
        
      
        
          "owner":null,
        
      
        
          "ownerID":null,
        
      
        
          "balanceBTC":null,
        
      
        
          "balanceETH":null,
        
      
        
          "balanceUSD":null,
        
      
        
          "balanceCAD":null,
        
      
        
          "balanceGBP":null 
        
      
      });
  }

}
