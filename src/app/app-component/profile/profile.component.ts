import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/app-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileData = {
    "user" : 0,
    "bio" : "",
    "location" : "",
    "birth_date" : "",
    "email_confirmed" : "",
    "image" : File
  }

  constructor(private _auth : AuthService, private _router : Router) { }

  ngOnInit(): void {
    this.profileData['user'] = +localStorage.getItem('user')
  }

  saveProfile() {
    // let array = this.profileData['image']['fileName'].split('\\')
    // console.log(array[array.length-1])
    // this.profileData['image']['fileName'] = 'http://127.0.0.1:8000/media/profile_pics/' + array[array.length-1]
    this._auth.saveProfile(this.profileData).subscribe(
      saveProfileResponse => {
        console.log(saveProfileResponse)
        this._router.navigate(['/'])
      },
      saveProfileError => {
        console.log(saveProfileError)
      },
      () => {console.log("Fetched profile data Successfully")}
    )
  }

}
