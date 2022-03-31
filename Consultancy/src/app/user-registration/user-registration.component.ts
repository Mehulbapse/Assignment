import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import data from '../../../db.json';
import addata from '../../../address.json';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

export interface Tags {
  name: string;
}

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent implements OnInit {
  registerForm: FormGroup;
  countryData: any = data;
  addressData: any = addata;
  country;
  state;
  newStateSelection;
  sliderData = 0;

  urllink: string = 'assets/images/defaultimg.webp';

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Tags[] = [];

  constructor(
    private formbuilder: FormBuilder,
    private dialogRef: MatDialogRef<UserRegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public datadialog
  ) {}

  // get firstName() {
  //   return this.registerForm.get('firstName');
  // }
  // get lastName() {
  //   return this.registerForm.get('lastName');
  // }
  // get countr() {
  //   return this.registerForm.get('country');
  // }
  // get stat() {
  //   return this.registerForm.get('state');
  // }
  // get address() {
  //   return this.registerForm.get('address');
  // }

  ngOnInit(): void {
    this.registerForm = this.formbuilder.group({
      firstName: new FormControl(null, [Validators.pattern('[a-zA-Z]{0,20}')]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, []),
      phone: new FormControl(null, []),
      age: new FormControl(null, [Validators.min(1), Validators.max(100)]),
      country: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      tags: new FormControl(null, []),
      image: new FormControl(null, []),
    });

    this.registerForm.patchValue({
      firstName: this.datadialog.formdata.firstName || '',
      lastName: this.datadialog.formdata.lastName || '',
      email: this.datadialog.formdata.email || '',
      phone: this.datadialog.formdata.phone || '',
      age: this.datadialog.formdata.age || '',
      image: this.datadialog.formdata.image || '',
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push({ name: value.trim() });
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

  setCountry() {
    const country = this.registerForm.get('country').value;

    this.state = this.countryData.countries.find(
      (item) => item.country === country
    );

    this.newStateSelection = this.state.states;
  }

  addUser(value) {
    const request = {
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      phone: value.phone,
      age: value.age,
      country: value.country,
      state: value.state,
      homeaddress: value.address[0],
      companyddress: value.address[1],
      image: this.urllink,
      tags: this.tags,
    };

    this.dialogRef.close(request);
  }

  cancel() {
    this.dialogRef.close();
  }

  selectFile(event) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.urllink = event.target.result;
      };
    }
  }
}
