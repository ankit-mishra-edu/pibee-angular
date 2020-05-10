import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/app-service/auth.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  profileData = {
    'user' : 0
  }
  profilePic;

  constructor(private _auth : AuthService) { }

  ngOnInit(): void {
    this.profileData['user'] = +localStorage.getItem('user')
    this.viewProfile()
  }

  viewProfile() {
    this._auth.editProfile(this.profileData).subscribe(
      viewProfileResponse => {
        this.profileData = viewProfileResponse
        this.profilePic = 'http://127.0.0.1:8000' + viewProfileResponse['image']
        console.log(viewProfileResponse)
      },
      viewProfileError => {
        console.log(viewProfileError)
      },
      () => {console.log("Fetched profile data Successfully")}
    )
  }

}
