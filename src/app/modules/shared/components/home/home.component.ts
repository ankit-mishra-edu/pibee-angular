import { SubSink } from 'subsink';
import { switchMap } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../../modules/shared/interfaces/User';
import { DataService } from '../../../../services/data.service';
import { IProfile } from '../../../../modules/shared/interfaces/Profile';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  notification = {
    type: '',
    title: '',
    message: '',
  };

  loggedInUser$: Observable<IUser>;
  userProfile$ = this._data.getUserProfile$();
  subscriptions = new SubSink();
  numberArray = [1, 2, 3];

  allUsersProfile: IProfile[];
  usernameChange = new Subject<string>();

  constructor(
    private _data: DataService,
    private _activatedRoute: ActivatedRoute,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loggedInUser$ = this._data.getLoggedInUser$();

    this.showNotification();
    this.setAllUsersProfiles();
  }

  setAllUsersProfiles() {
    this.subscriptions.sink = this._data
      .getAllUserProfile$()
      .subscribe((getAllUsersProfileResponse) => {
        console.log(getAllUsersProfileResponse);
        this.allUsersProfile = getAllUsersProfileResponse;
      });
  }

  matchingUsersArray$ = this._data
    .getSearchBoxQuery$()
    .pipe(
      switchMap((keyword) =>
        this._data.ProcessKeywords(
          keyword,
          this.allUsersProfile,
          this.suggestUsers
        )
      )
    );

  suggestUsers(
    partial: string,
    allUsersProfile: IProfile[]
  ): Observable<IProfile[]> {
    let usernamesArray: IProfile[] = [];
    console.log(partial);
    allUsersProfile?.forEach((userProfile) => {
      if (
        userProfile.address.user.username
          .toLowerCase()
          .includes(partial.toLowerCase())
      ) {
        usernamesArray.push(userProfile);
      }
    });
    console.log(usernamesArray);
    return of(usernamesArray);
  }

  getNotificationMessage() {
    this._notificationService.getNotificationMessage().subscribe((message) => {
      this.notification.type = message?.type;
      this.notification.title = message?.title;
      this.notification.message = message?.message;
    });
  }

  showNotification() {
    this.getNotificationMessage();

    if (this.notification?.message != null) {
      this._notificationService.notify(
        this.notification.type,
        this.notification.title,
        this.notification.message
      );
      this._notificationService.setNotification(null, null, null);
    }
  }
}
