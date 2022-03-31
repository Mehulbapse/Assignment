import { I } from '@angular/cdk/keycodes';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterFormServiceService } from '../services/register-form-service.service';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  

  data;
  id
  constructor(private router:Router,
    public dialog: MatDialog,
    private http: HttpClient,
    private service:RegisterFormServiceService,

    ) { }

  
  ngOnInit(): void {
  }

  register(){
      const dialogRef =this.dialog.open(UserRegistrationComponent,{
      width: '810px',height: '750px'
      });
      dialogRef.afterClosed().subscribe(res=>{
        console.log(res)
        if(res !== undefined){
          this.service.registerForm(res).subscribe( (response) => {
            if(response.type === HttpEventType.Response){
            this.data =[response.body]
            this.id = this.data[0].id
            if(response.status == 201){
              this.router.navigate(['profile/' + this.id])
            }
            }
          })
        }
      })
  }
}
