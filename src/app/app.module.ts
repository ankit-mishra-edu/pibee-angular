import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './components/site-layout/main/content/content.component';
import { FooterComponent } from './components/site-layout/footer/footer/footer.component';
import { SidebarComponent } from './components/site-layout/main/right-sidebar/sidebar/sidebar.component';
import { NavbarComponent } from './components/site-layout/header/navbar/navbar.component';
import { SearchComponent } from './components/shared/search/search.component';
import { HomeComponent } from './components/site-layout/main/content/home/home.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { ChatComponent } from './components/chatapp/chatapp/chat.component';
import { LogoutComponent } from './components/authentication/logout/logout.component';
import { EditProfileComponent } from './components/authentication/profile/edit-profile/edit-profile.component';
import { ViewProfileComponent } from './components/authentication/profile/view-profile/view-profile.component';
import { EditDetailsComponent } from './components/authentication/edit-details/edit-details.component';
import { ChangePasswordComponent } from './components/authentication/change-password/change-password.component';
import { NotificationComponent } from './components/shared/notification/notification.component';
import { PostComponent } from './components/posts/post/post.component';
import { SpeechComponent } from './components/shared/speech/speech.component';
import { ViewPostComponent } from './components/posts/view-post/view-post.component';
import { EditPostComponent } from './components/posts/edit-post/edit-post.component';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ChatComponent,
    LogoutComponent,
    EditProfileComponent,
    ViewProfileComponent,
    EditDetailsComponent,
    ChangePasswordComponent,
    ContentComponent,
    FooterComponent,
    SidebarComponent,
    SearchComponent,
    NotificationComponent,
    PostComponent,
    SpeechComponent,
    ViewPostComponent,
    EditPostComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
