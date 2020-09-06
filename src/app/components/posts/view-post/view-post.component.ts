import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUser } from 'src/app/interfaces/User';
import { SubSink } from 'subsink';
import { DataService } from 'src/app/services/data-service/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss'],
})
export class ViewPostComponent implements OnInit, OnDestroy {
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
