import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/app-service/auth-service/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IProfile } from 'src/app/app-interface/Profile';
import { SubSink } from 'subsink';
import { IUser } from 'src/app/app-interface/User';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  subscriptions = new SubSink();
  loggedInUser: IUser = this._auth.GetLoggedInUser();
  profileFormData: IProfile = {
    user: this.loggedInUser.id,
    bio: '',
    location: '',
    birth_date: '',
    email_confirmed: '',
    image: '',
  };

  constructor(private _auth: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile() {
    this.subscriptions.sink = this._auth
      .GetUserProfile(this.profileFormData.user)
      .subscribe(
        (getUserProfileResponse) => {
          console.log(getUserProfileResponse);
          this.profileFormData = getUserProfileResponse;
          delete this.profileFormData.image;
        },

        (getUserProfileError) => {
          console.log(getUserProfileError);
        },

        () => {
          console.log('Fetched profile data Successfully');
        }
      );
  }

  editProfile() {
    this.subscriptions.sink = this._auth
      .EditProfile(this.profileFormData)
      .subscribe(
        (editProfileResponse) => {
          console.log(editProfileResponse);
          this._router.navigate(['/']);
        },
        (editProfileError) => {
          console.log(editProfileError);
        },
        () => {
          console.log('Edit profile Service called Successfully');
        }
      );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
