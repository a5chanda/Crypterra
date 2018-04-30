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
import { CompanyService } from './Company.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Company',
	templateUrl: './Company.component.html',
	styleUrls: ['./Company.component.css'],
  providers: [CompanyService]
})
export class CompanyComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
	private errorMessage;

  
      
          companyName = new FormControl("", Validators.required);
        
  
      
          companyID = new FormControl("", Validators.required);
        
  
      
          employees = new FormControl("", Validators.required);
        
  
      
          location = new FormControl("", Validators.required);
        
  
      
          description = new FormControl("", Validators.required);
        
  
      
          ceo = new FormControl("", Validators.required);
        
  
      
          subsidiaries = new FormControl("", Validators.required);
        
  
      
          acc = new FormControl("", Validators.required);
        
  


  constructor(private serviceCompany:CompanyService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          companyName:this.companyName,
        
    
        
          companyID:this.companyID,
        
    
        
          employees:this.employees,
        
    
        
          location:this.location,
        
    
        
          description:this.description,
        
    
        
          ceo:this.ceo,
        
    
        
          subsidiaries:this.subsidiaries,
        
    
        
          acc:this.acc
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceCompany.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
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
   * @param {String} name - the name of the participant field to update
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
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "org.deloitte.net.Company",
      
        
          "companyName":this.companyName.value,
        
      
        
          "companyID":this.companyID.value,
        
      
        
          "employees":this.employees.value,
        
      
        
          "location":this.location.value,
        
      
        
          "description":this.description.value,
        
      
        
          "ceo":this.ceo.value,
        
      
        
          "subsidiaries":this.subsidiaries.value,
        
      
        
          "acc":this.acc.value
        
      
    };

    this.myForm.setValue({
      
        
          "companyName":null,
        
      
        
          "companyID":null,
        
      
        
          "employees":null,
        
      
        
          "location":null,
        
      
        
          "description":null,
        
      
        
          "ceo":null,
        
      
        
          "subsidiaries":null,
        
      
        
          "acc":null
        
      
    });

    return this.serviceCompany.addParticipant(this.participant)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "companyName":null,
        
      
        
          "companyID":null,
        
      
        
          "employees":null,
        
      
        
          "location":null,
        
      
        
          "description":null,
        
      
        
          "ceo":null,
        
      
        
          "subsidiaries":null,
        
      
        
          "acc":null 
        
      
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


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "org.deloitte.net.Company",
      
        
          
            "companyName":this.companyName.value,
          
        
    
        
          
        
    
        
          
            "employees":this.employees.value,
          
        
    
        
          
            "location":this.location.value,
          
        
    
        
          
            "description":this.description.value,
          
        
    
        
          
            "ceo":this.ceo.value,
          
        
    
        
          
            "subsidiaries":this.subsidiaries.value,
          
        
    
        
          
            "acc":this.acc.value
          
        
    
    };

    return this.serviceCompany.updateParticipant(form.get("companyID").value,this.participant)
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


  deleteParticipant(): Promise<any> {

    return this.serviceCompany.deleteParticipant(this.currentId)
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

    return this.serviceCompany.getparticipant(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "companyName":null,
          
        
          
            "companyID":null,
          
        
          
            "employees":null,
          
        
          
            "location":null,
          
        
          
            "description":null,
          
        
          
            "ceo":null,
          
        
          
            "subsidiaries":null,
          
        
          
            "acc":null 
          
        
      };



      
        if(result.companyName){
          
            formObject.companyName = result.companyName;
          
        }else{
          formObject.companyName = null;
        }
      
        if(result.companyID){
          
            formObject.companyID = result.companyID;
          
        }else{
          formObject.companyID = null;
        }
      
        if(result.employees){
          
            formObject.employees = result.employees;
          
        }else{
          formObject.employees = null;
        }
      
        if(result.location){
          
            formObject.location = result.location;
          
        }else{
          formObject.location = null;
        }
      
        if(result.description){
          
            formObject.description = result.description;
          
        }else{
          formObject.description = null;
        }
      
        if(result.ceo){
          
            formObject.ceo = result.ceo;
          
        }else{
          formObject.ceo = null;
        }
      
        if(result.subsidiaries){
          
            formObject.subsidiaries = result.subsidiaries;
          
        }else{
          formObject.subsidiaries = null;
        }
      
        if(result.acc){
          
            formObject.acc = result.acc;
          
        }else{
          formObject.acc = null;
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
      
        
          "companyName":null,
        
      
        
          "companyID":null,
        
      
        
          "employees":null,
        
      
        
          "location":null,
        
      
        
          "description":null,
        
      
        
          "ceo":null,
        
      
        
          "subsidiaries":null,
        
      
        
          "acc":null 
        
      
      });
  }

}
