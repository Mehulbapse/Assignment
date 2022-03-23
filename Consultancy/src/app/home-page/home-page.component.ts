import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  

  // @Output() registerEvent = new EventEmitter();
  constructor(private router:Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  register(){
      // this.registerEvent.emit();
      const dialogRef =this.dialog.open(UserRegistrationComponent,{
      width: '810px',height: '750px'
      });
      dialogRef.afterClosed().subscribe(res=>{
        console.log(res)
      })
  }
}
