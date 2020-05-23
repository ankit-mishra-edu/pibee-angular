import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './app-component/home/home.component';
import { LoginComponent } from './app-component/authenticate/login/login.component';
import { ChatappComponent } from './app-component/chatapp/chatapp.component';
import { RegisterComponent } from './app-component/authenticate/register/register.component';
import { LogoutComponent } from './app-component/authenticate/logout/logout.component';
import { EditProfileComponent } from './app-component/authenticate/profile/edit-profile/edit-profile.component';
import { ViewProfileComponent } from './app-component/authenticate/profile/view-profile/view-profile.component';
import { EditDetailsComponent } from './app-component/authenticate/edit-details/edit-details.component';
import { ChangePasswordComponent } from './app-component/authenticate/change-password/change-password.component';


const routes: Routes = [
  {path : '', component : HomeComponent},
  {path : 'login', component : LoginComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'logout', component : LogoutComponent},
  {path : 'chatapp', component : ChatappComponent},
  {path : 'edit-profile', component : EditProfileComponent},
  {path : 'view-profile', component : ViewProfileComponent},
  {path : 'edit-details', component : EditDetailsComponent},
  {path : 'change-password', component : ChangePasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
