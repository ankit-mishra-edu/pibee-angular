import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './app-component/home/home.component';
import { LoginComponent } from './app-component/login/login.component';
import { ChatappComponent } from './app-component/chatapp/chatapp.component';
import { ProfileComponent } from './app-component/profile/profile.component';
import { RegisterComponent } from './app-component/register/register.component';
import { LogoutComponent } from './app-component/logout/logout.component';


const routes: Routes = [
  {path : '', component : HomeComponent},
  {path : 'login', component : LoginComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'logout', component : LogoutComponent},
  {path : 'chatapp', component : ChatappComponent},
  {path : 'profile', component : ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
