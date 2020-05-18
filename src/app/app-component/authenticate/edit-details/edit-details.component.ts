import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/app-service/auth-service/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css']
})
export class EditDetailsComponent implements OnInit {

  editDetailFormData;
  isUserConfirmed : boolean = false;

  constructor(private _auth : AuthService, private _route : Router) { }

  ngOnInit(): void {
    this.editDetailFormData = {
      "user" : {
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
    this._auth.LogIn(loginFormData).subscribe(
      logInResponse => {
        console.log(logInResponse)
        this.getUserDetails();
      },

      logInError => {
        console.log(logInError)
        this.isUserConfirmed = false;
        alert(logInError.error.error)
      },

      () => {console.log("Logged In Successfully")}
    )
  }

  getUserDetails() {
    this._auth.GetAllUsers().subscribe(
      getAllUsersResponse => {
        console.log(getAllUsersResponse)
        getAllUsersResponse.forEach(usersArray => {
          if (usersArray.id == +localStorage.getItem('user')) {
            this.editDetailFormData.user = usersArray;
            this.isUserConfirmed = true;
          }
        });
      },

      getAllUsersError => {
        console.log(getAllUsersError)
        alert("Login first to change details")
      },

      () => {
        console.log("Users Fetched Successfully")
      }
    )
  }

  changeUserDetails(){
    if (this.editDetailFormData.user.username == localStorage.getItem('username')) {
      this._auth.EditUserDetails(this.editDetailFormData).subscribe(
        editUserDetailsResponse => {
          console.log(editUserDetailsResponse)
        },
  
        editUserDetailsError => {
          console.log(editUserDetailsError)
          alert(editUserDetailsError.error)
        },
  
        () => {
          console.log("Sign up Successful")
          this._route.navigate([''])
        }
      )
    }
    else {
      alert("You can't change details as you are not signed in as " + this.editDetailFormData.user.username)
    }
  }
}