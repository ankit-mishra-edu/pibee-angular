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

  profileData = {
    "user" : 0,
    "bio" : "",
    "location" : "",
    "birth_date" : "",
    "email_confirmed" : "",
    "image" : '' 
  }

  constructor(private _auth : AuthService, private _router : Router) { }

  ngOnInit(): void {
    this.profileData['user'] = +localStorage.getItem('user')
  }

  editProfile() {
    // let array = this.image.split('\\')
    // console.log(array[array.length-1])
    // this.image = 'http://127.0.0.1:8000/media/profile_pics/' + array[array.length-1]
    // console.log(this.image)
    
    this._auth.editProfile(this.profileData).subscribe(
      editProfileResponse => {
        console.log(editProfileResponse)
        this._router.navigate(['/'])
      },
      editProfileError => {
        console.log(editProfileError)
      },
      () => {console.log("Fetched profile data Successfully")}
    )
  }

}
