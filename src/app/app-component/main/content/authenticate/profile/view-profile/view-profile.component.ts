import { SubSink } from 'subsink';
import { IUser } from 'src/app/app-interface/User';
import { IProfile } from 'src/app/app-interface/Profile';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/app-service/auth-service/auth.service';
import { DataService } from 'src/app/app-service/data-service/data.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent implements OnInit, OnDestroy {
  subscriptions = new SubSink();
  loggedInUser: IUser = this._data.loggedInUser;
  profileData: IProfile = {
    user: this.loggedInUser.id,
    bio: '',
    location: '',
    birth_date: '',
    email_confirmed: '',
    image: '',
  };

  constructor(private _auth: AuthService, private _data: DataService) {}

  ngOnInit(): void {
    this.viewProfile();
  }

  viewProfile() {
    this.subscriptions.sink = this._data
      .GetUserProfileById(this.profileData.user)
      .subscribe(
        (getUserProfileResponse) => {
          console.log(getUserProfileResponse);
          this.profileData = getUserProfileResponse;
        },

        (getUserProfileError) => {
          console.log(getUserProfileError);
        },

        () => {
          console.log('Fetched profile data Successfully');
        }
      );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
