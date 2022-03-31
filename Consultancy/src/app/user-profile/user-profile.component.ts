import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { RegisterFormServiceService } from '../services/register-form-service.service';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit,OnDestroy {
  sub
  id
  data
  jsonString;
  image;

  @Output() imageValue = new EventEmitter();
  constructor(
    private activatedRoute: ActivatedRoute,
    private service  : ProfileService,
    private registerservice : RegisterFormServiceService,
    public dialog: MatDialog,
    private router:Router
  )
  {
    this.sub = this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id')
    })
  }

  ngOnInit(): void {
    console.log(this.id)
    this.getUser(this.id)
  }

  getUser = (id) =>{
    console.log("////////" ,id)
    this.service.getProfile(id).subscribe((response) =>{
      if(response.type === HttpEventType.Response){
        this.data =response.body
        this.image =this.data.image;
        console.log(this.image)

        }
      })
  }

  selectFile(event){
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onload =(event:any)=>{
        console.log(event);
        this.image =event.target.result
        console.log(event.target.result)

      }
    }
  }


  editProfile =() =>{
    const dialogRef =this.dialog.open(UserRegistrationComponent,{
      width: '810px',height: '750px',
      data :{
        formdata:this.data
      }
      });
      dialogRef.afterClosed().subscribe(res =>{
        const result =res
        console.log(result)
        if(result !== undefined){
          this.registerservice.upadateFormDetails(res,this.id).subscribe(res =>{
            this.router.navigate(['profile/' + this.id]);
            window.location.reload();
          })

        }else
        {
          return
        }

      })

  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }
}
