import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './app-component/main/content/home/home.component';
import { LoginComponent } from './app-component/main/content/authenticate/login/login.component';
import { RegisterComponent } from './app-component/main/content/authenticate/register/register.component';
import { LogoutComponent } from './app-component/main/content/authenticate/logout/logout.component';
import { ChatappComponent } from './app-component/main/content/chatapp/chatapp.component';
import { EditProfileComponent } from './app-component/main/content/authenticate/profile/edit-profile/edit-profile.component';
import { ViewProfileComponent } from './app-component/main/content/authenticate/profile/view-profile/view-profile.component';
import { EditDetailsComponent } from './app-component/main/content/authenticate/edit-details/edit-details.component';
import { ChangePasswordComponent } from './app-component/main/content/authenticate/change-password/change-password.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'home/:notificationMessage/:notificationTitle',
    component: HomeComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'chatapp', component: ChatappComponent },
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
