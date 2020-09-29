import { SubSink } from 'subsink';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

// All Services
import { DataService } from '../../../services/data.service';

// All Interfaces
import { IUser } from '../../../modules/shared/interfaces/User';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent implements OnInit, OnDestroy {
  userId: number;
  profileKeys: string[];
  subscriptions = new SubSink();

  loggedInUser: IUser = this._data.loggedInUser;
  userProfile$ = this._data.getUserProfile$();

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
