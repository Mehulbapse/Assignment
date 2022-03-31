import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  config = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

  constructor(
    private http: HttpClient
  ) { }
 
   get = (url)=>{
    const option:object ={headers : this.config ,reportProgress : true, observe:'events'}
    return this.http.get(url,option).pipe(
      map((response:any) => response),
      catchError(err =>{
        console.log('Handling error locally and rethrowing it...', err);
         return throwError(err);
      })
      );
   }

  post =(url:string ,resourcename:any) =>{
    const option:object ={headers : this.config ,reportProgress : true, observe:'events'}
    return this.http.post(url,resourcename,option).pipe(
      map((response:any) => response),
      catchError(err =>{
        console.log('Handling error locally and rethrowing it...', err);
         return throwError(err);
      })
      );
  }

  put =(url: string,resource:any) => {
    const option:object ={headers : this.config ,reportProgress : true, observe:'events'}
    return this.http.put(url,resource,option).pipe(
      map((response:any) => response),
      catchError(err =>{
        console.log('Handling error locally and rethrowing it...', err);
         return throwError(err);
      })
      );
  }


}
