import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './app-component/home/home.component';
import { LoginComponent } from './app-component/authenticate/login/login.component';
import { RegisterComponent } from './app-component/authenticate/register/register.component';
import { ChatappComponent } from './app-component/chatapp/chatapp.component';
import { LogoutComponent } from './app-component/authenticate/logout/logout.component';
import { EditProfileComponent } from './app-component/authenticate/profile/edit-profile/edit-profile.component';
import { ViewProfileComponent } from './app-component/authenticate/profile/view-profile/view-profile.component';
import { EditDetailsComponent } from './app-component/authenticate/edit-details/edit-details.component';
import { ChangePasswordComponent } from './app-component/authenticate/change-password/change-password.component';
import { NavbarComponent } from './app-component/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ChatappComponent,
    LogoutComponent,
    EditProfileComponent,
    ViewProfileComponent,
    EditDetailsComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
