import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './app-component/main/content/content.component';
import { FooterComponent } from './app-component/footer/footer.component';
import { SidebarComponent } from './app-component/main/sidebar/sidebar.component';
import { NavbarComponent } from './app-component/header/navbar/navbar.component';
import { SearchComponent } from './app-component/header/search/search.component';
import { HomeComponent } from './app-component/main/content/home/home.component';
import { LoginComponent } from './app-component/main/content/authenticate/login/login.component';
import { RegisterComponent } from './app-component/main/content/authenticate/register/register.component';
import { ChatappComponent } from './app-component/main/content/chatapp/chatapp.component';
import { LogoutComponent } from './app-component/main/content/authenticate/logout/logout.component';
import { EditProfileComponent } from './app-component/main/content/authenticate/profile/edit-profile/edit-profile.component';
import { ViewProfileComponent } from './app-component/main/content/authenticate/profile/view-profile/view-profile.component';
import { EditDetailsComponent } from './app-component/main/content/authenticate/edit-details/edit-details.component';
import { ChangePasswordComponent } from './app-component/main/content/authenticate/change-password/change-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'node_modules/angular2-notifications';
import { NotificationsService } from 'angular2-notifications';

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
    ContentComponent,
    FooterComponent,
    SidebarComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
