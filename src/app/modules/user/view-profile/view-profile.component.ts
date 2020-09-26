import { SubSink } from 'subsink';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { IUser } from '../../../modules/shared/interfaces/User';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent implements OnInit, OnDestroy {
  userId: number;
  loggedInUser: IUser = this._data.loggedInUser;
  subscriptions = new SubSink();
  userProfile$ = this._data.getUserProfile$();
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
          this._data.setUserProfile$(userProfileResponse);
          this.profileKeys = Object.keys(userProfileResponse);
        });
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
