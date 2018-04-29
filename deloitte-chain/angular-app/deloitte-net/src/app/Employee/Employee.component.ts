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
import { EmployeeService } from './Employee.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Employee',
	templateUrl: './Employee.component.html',
	styleUrls: ['./Employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
	private errorMessage;

  
      
          employeeID = new FormControl("", Validators.required);
        
  
      
          firstName = new FormControl("", Validators.required);
        
  
      
          lastName = new FormControl("", Validators.required);
        
  
      
          position = new FormControl("", Validators.required);
        
  
      
          salary = new FormControl("", Validators.required);
        
  
      
          acc = new FormControl("", Validators.required);
        
  


  constructor(private serviceEmployee:EmployeeService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          employeeID:this.employeeID,
        
    
        
          firstName:this.firstName,
        
    
        
          lastName:this.lastName,
        
    
        
          position:this.position,
        
    
        
          salary:this.salary,
        
    
        
          acc:this.acc
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceEmployee.getAll()
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
      $class: "org.deloitte.net.Employee",
      
        
          "employeeID":this.employeeID.value,
        
      
        
          "firstName":this.firstName.value,
        
      
        
          "lastName":this.lastName.value,
        
      
        
          "position":this.position.value,
        
      
        
          "salary":this.salary.value,
        
      
        
          "acc":this.acc.value
        
      
    };

    this.myForm.setValue({
      
        
          "employeeID":null,
        
      
        
          "firstName":null,
        
      
        
          "lastName":null,
        
      
        
          "position":null,
        
      
        
          "salary":null,
        
      
        
          "acc":null
        
      
    });

    return this.serviceEmployee.addParticipant(this.participant)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "employeeID":null,
        
      
        
          "firstName":null,
        
      
        
          "lastName":null,
        
      
        
          "position":null,
        
      
        
          "salary":null,
        
      
        
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
      $class: "org.deloitte.net.Employee",
      
        
          
        
    
        
          
            "firstName":this.firstName.value,
          
        
    
        
          
            "lastName":this.lastName.value,
          
        
    
        
          
            "position":this.position.value,
          
        
    
        
          
            "salary":this.salary.value,
          
        
    
        
          
            "acc":this.acc.value
          
        
    
    };

    return this.serviceEmployee.updateParticipant(form.get("employeeID").value,this.participant)
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

    return this.serviceEmployee.deleteParticipant(this.currentId)
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

    return this.serviceEmployee.getparticipant(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "employeeID":null,
          
        
          
            "firstName":null,
          
        
          
            "lastName":null,
          
        
          
            "position":null,
          
        
          
            "salary":null,
          
        
          
            "acc":null 
          
        
      };



      
        if(result.employeeID){
          
            formObject.employeeID = result.employeeID;
          
        }else{
          formObject.employeeID = null;
        }
      
        if(result.firstName){
          
            formObject.firstName = result.firstName;
          
        }else{
          formObject.firstName = null;
        }
      
        if(result.lastName){
          
            formObject.lastName = result.lastName;
          
        }else{
          formObject.lastName = null;
        }
      
        if(result.position){
          
            formObject.position = result.position;
          
        }else{
          formObject.position = null;
        }
      
        if(result.salary){
          
            formObject.salary = result.salary;
          
        }else{
          formObject.salary = null;
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
      
        
          "employeeID":null,
        
      
        
          "firstName":null,
        
      
        
          "lastName":null,
        
      
        
          "position":null,
        
      
        
          "salary":null,
        
      
        
          "acc":null 
        
      
      });
  }

}
