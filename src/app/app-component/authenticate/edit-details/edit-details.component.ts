import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/app-service/auth-service/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css']
})
export class EditDetailsComponent implements OnInit, OnDestroy {

  editDetailFormData;
  isUserConfirmed : boolean = false;
  subscriptions = new SubSink();

  constructor(private _auth : AuthService, private _route : Router) { }

  ngOnInit(): void {
    this.editDetailFormData = {
      "user" : {
        'id' : 0,
        "username" : '' ,
        "first_name" : '' ,
        "last_name" : '' ,
        "email" : '',
        "password" : ''
      }
    }
  }

  confirmUser(form : NgForm) {
    let loginFormData = {
      "user" : {
        "username" : localStorage.getItem('username'),
        "password" : form.value.password,
        "email" : 'amishm7@gmail.com'
      }
    }
    this.subscriptions.sink = this._auth.LogIn(loginFormData)
    .subscribe(
      logInResponse => {
        console.log(logInResponse)
        localStorage.setItem('username', logInResponse.user.username)
        this.editDetailFormData.user = logInResponse.user;
        this.isUserConfirmed = true;
        // this.getUserDetails();
      },

      logInError => {
        console.log(logInError)
        this.isUserConfirmed = false;
        alert(logInError)
      },

      () => {console.log("Logged In Successfully")}
    )
  }

  changeUserDetails(){  
    this.subscriptions.sink = this._auth.EditUserDetails(this.editDetailFormData)
    .subscribe(
      editUserDetailsResponse => {
        console.log(editUserDetailsResponse);
        this._route.navigate(['']);
      },

      editUserDetailsError => {
        console.log(editUserDetailsError);
        alert(editUserDetailsError.error);
      },

      () => {
        console.log("Sign up Successful");
      }
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  // getUserDetails() {
  //   this.subscriptions.sink = this._auth.GetUser(this.editDetailFormData.user.id)
  //   .subscribe(
  //     getUserResponse => {
  //       console.log(getUserResponse)
  //       this.editDetailFormData.user = getUserResponse;
  //       this.isUserConfirmed = true;
  //     },

  //     getUserError => {
  //       console.log(getAllUsersError)
  //       alert("Login first to change details")
  //     },

  //     () => {
  //       console.log("Users Fetched Successfully")
  //     }
  //   )
  // }
}