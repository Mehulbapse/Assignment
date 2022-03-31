
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UrlConfig } from '../url.config';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterFormServiceService {

  
  private url = UrlConfig.registerFormUrl

  constructor(private dataService :DataService) { }


  registerForm = (requestbody) =>{
    const url = this.url
    return this.dataService.post(url, requestbody)
  }


  upadateFormDetails =(requestbody,id) =>{
    const url = this.url + '/'+ id;
    return this.dataService.put(url, requestbody)
  }


}


