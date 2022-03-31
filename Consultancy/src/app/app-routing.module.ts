import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';

const routes: Routes = [
  {path :'',redirectTo :'home',pathMatch: 'full'},
  {path:'home',component: HomePageComponent},
  {path:'register',component: UserRegistrationComponent},
  {path:'profile/:id',component: UserProfileComponent},
  {path:'**',pathMatch:'full',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
