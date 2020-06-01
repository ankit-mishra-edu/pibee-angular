import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './app-component/main/home/home.component';
import { LoginComponent } from './app-component/main/authenticate/login/login.component';
import { RegisterComponent } from './app-component/main/authenticate/register/register.component';
import { ChatappComponent } from './app-component/main/chatapp/chatapp.component';
import { LogoutComponent } from './app-component/main/authenticate/logout/logout.component';
import { EditProfileComponent } from './app-component/main/authenticate/profile/edit-profile/edit-profile.component';
import { ViewProfileComponent } from './app-component/main/authenticate/profile/view-profile/view-profile.component';
import { EditDetailsComponent } from './app-component/main/authenticate/edit-details/edit-details.component';
import { ChangePasswordComponent } from './app-component/main/authenticate/change-password/change-password.component';
import { NavbarComponent } from './app-component/navbar/navbar.component';
import { MainComponent } from './app-component/main/main.component';
import { FooterComponent } from './app-component/footer/footer.component';

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
    MainComponent,
    FooterComponent,
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
