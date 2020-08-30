import { SubSink } from 'subsink';
import { IUser } from 'src/app/interfaces/User';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { DataService } from 'src/app/services/data-service/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent implements OnInit, OnDestroy {
  userId: number;
  loggedInUser: IUser = this._data.loggedInUser;
  subscriptions = new SubSink();
  userProfile$ = this._data.userProfile$;
  profileKeys;

  constructor(
    private _data: DataService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(
      (params) => (this.userId = params?.id)
    );
    if (this.userId != this.loggedInUser?.id) {
      this._data
        .GetUserProfileById(this.userId)
        .subscribe((userProfileResponse) => {
          this._data.userProfileSubject$.next(userProfileResponse);
          this.profileKeys = Object.keys(userProfileResponse);
        });
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
