import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import  data from '../../../db.json';
import  addata from '../../../address.json';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

export interface Tags {
  name: string;
}

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})


export class UserRegistrationComponent implements OnInit {
  registerForm
  countryData :any=data
  addressData:any =addata
  country;
  state;
  newStateSelection
  sliderData =0;



  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Tags[] = [];


  constructor(
    private formbuilder:FormBuilder,
    private dialogRef:MatDialogRef<UserRegistrationComponent>,
    // @Inject(MAT_DIALOG_DATA) public dataDialog:any
  ) {
    // console.log(dataDialog)
    this.registerForm=this.formbuilder.group({
      firstName :new FormControl(null,[]),
      lastName :new FormControl(null,[]),
      email : new FormControl(null,[]),
      phone : new FormControl(null,[]),
      age :new FormControl(null,[Validators.min(1),Validators.max(100)]),
      country :new FormControl(null,[]),
      state:new FormControl(null,[]),
      address:new FormControl(null,[]),
      tags:new FormControl(null,[])
    })

    

   }

  ngOnInit(): void {
    
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: Tags): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
   
  setCountry(country){
    console.log(country)
    this.state =[this.countryData.countries.find((item)=> item.country === country)]
    console.log(this.state)
    this.newStateSelection=this.state[0].states
    console.log(this.newStateSelection)
    // this.country=this.countryData.countries[0].states
  }



  addUser(value){
     console.log(value)
     console.log("In slider ",value.age)
     const request ={
       firstName :value.firstName,
       lastName :value.lastName,
       email :value.email,
       phone :value.phone,
       age :value.age.value,
       country :value.country,
       state :value.state,
       homeaddress:value.address[0],
       companyddress:value.address[1],
     }
     this.dialogRef.close(request)
     console.log(request)
  }

  cancel(){
    this.dialogRef.close();
  }
}
