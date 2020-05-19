import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/app-service/auth-service/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  profileFormData = {
    "user" : 0,
    "bio" : "",
    "location" : "",
    "birth_date" : "",
    "email_confirmed" : "",
    "image" : "" 
  }

  constructor(private _auth : AuthService, private _router : Router) { }

  ngOnInit(): void {
    this.getUserProfile()
  }

  getUserProfile() {
    this._auth.GetAllUserProfiles().subscribe(
      getAllUserProfilesResponse => {
        console.log(getAllUserProfilesResponse)

        getAllUserProfilesResponse.forEach(userProfilesArray => {
          if (userProfilesArray.user.id == +localStorage.getItem('user')) {
            this.profileFormData = userProfilesArray;
            this.profileFormData.user = userProfilesArray.user.id;
            delete this.profileFormData.image;
          }
        });
      },

      getUserProfileError => {
        console.log(getUserProfileError)
      },

      () => {console.log("Fetched profile data Successfully")}
    )
  }

  editProfile() {
    this._auth.editProfile(this.profileFormData).subscribe(
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
