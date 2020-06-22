import { SubSink } from 'subsink';
import { IUser } from 'src/app/app-interface/User';
import { IProfile } from 'src/app/app-interface/Profile';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/app-service/auth-service/auth.service';
import { DataService } from 'src/app/app-service/data-service/data.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent implements OnInit, OnDestroy {
  userId: number;
  userProfile: IProfile;
  loggedInUser: IUser = this._data.loggedInUser;
  subscriptions = new SubSink();
  userProfile$ = this._data.userProfile$;

  constructor(
    private _auth: AuthService,
    private _data: DataService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(
      (params) => (this.userId = params.id)
    );
    if (this.userId != this.loggedInUser.id) {
      this._data
        .GetUserProfileById(this.userId)
        .subscribe((userProfileResponse) => {
          console.log(userProfileResponse);
          this.userProfile = userProfileResponse;
        });
    } else {
      this.setUserProfile();
    }
  }

  setUserProfile() {
    this.subscriptions.sink = this._data.userProfileSubject$.subscribe(
      (userProfileResponse) => {
        console.log(userProfileResponse);
        this.userProfile = userProfileResponse;
      }
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
