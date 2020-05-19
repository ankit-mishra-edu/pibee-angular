import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/app-service/auth-service/auth.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  profileData = {
    "user" : 0,
    "bio" : "",
    "location" : "",
    "birth_date" : "",
    "email_confirmed" : "",
    "image" : '' 
  }

  constructor(private _auth : AuthService) { }

  ngOnInit(): void {
    this.profileData['user'] = +localStorage.getItem('user')
    this.viewProfile()
  }

  viewProfile() {
    this._auth.GetAllUserProfiles().subscribe(
      getAllUserProfilesResponse => {
        console.log(getAllUserProfilesResponse)

        getAllUserProfilesResponse.forEach(userProfilesArray => {
          if (userProfilesArray.user.id == +localStorage.getItem('user')) {
            this.profileData = userProfilesArray;
          }
        });
      },

      getUserProfileError => {
        console.log(getUserProfileError)
      },

      () => {console.log("Fetched profile data Successfully")}
    )
  }

}
