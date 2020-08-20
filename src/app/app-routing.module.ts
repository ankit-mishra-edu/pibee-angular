import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/site-layout/main/content/home/home.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { LogoutComponent } from './components/authentication/logout/logout.component';
import { ChatComponent } from './components/chatapp/chatapp/chat.component';
import { EditProfileComponent } from './components/authentication/profile/edit-profile/edit-profile.component';
import { ViewProfileComponent } from './components/authentication/profile/view-profile/view-profile.component';
import { EditDetailsComponent } from './components/authentication/edit-details/edit-details.component';
import { ChangePasswordComponent } from './components/authentication/change-password/change-password.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'chatapp', component: ChatComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'view-profile/:id', component: ViewProfileComponent },
  { path: 'edit-details', component: EditDetailsComponent },
  { path: 'change-password', component: ChangePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
