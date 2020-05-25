import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/app-service/auth-service/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IProfile } from 'src/app/app-interface/Profile';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  profileFormData : IProfile = {
    "user" : 0,
    "bio" : "",
    "location" : "",
    "birth_date" : "",
    "email_confirmed" : "",
    "image" : "" 
  }

  constructor(private _auth : AuthService, private _router : Router) { }

  ngOnInit(): void {
    this.profileFormData.user = +localStorage.getItem('user');
    this.getUserProfile()
  }

  getUserProfile() {
    this._auth.GetUserProfile(this.profileFormData.user).subscribe(
      getUserProfileResponse => {
        console.log(getUserProfileResponse)
        this.profileFormData = getUserProfileResponse;
        delete this.profileFormData.image;
      },

      getUserProfileError => {
        console.log(getUserProfileError)
      },

      () => {console.log("Fetched profile data Successfully")}
    )
  }

  editProfile() {
    this._auth.EditProfile(this.profileFormData).subscribe(
      editProfileResponse => {
        console.log(editProfileResponse)
        this._router.navigate(['/'])
      },
      editProfileError => {
        console.log(editProfileError)
      },
      () => {console.log("Edit profile Service called Successfully")}
    )
  }

}
