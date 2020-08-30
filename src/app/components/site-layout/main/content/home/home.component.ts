import { SubSink } from 'subsink';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/User';
import { Observable, Subject } from 'rxjs';
import { DataService } from 'src/app/services/data-service/data.service';
import { IProfile } from 'src/app/interfaces/Profile';
import { NotificationService } from 'src/app/services/notification-service/notification.service';
import { ActivatedRoute } from '@angular/router';

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
  userProfile$ = this._data.userProfile$;
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
    this.loggedInUser$ = this._data.loggedInUser$;

    this.showNotification();
    this.setAllUsersProfiles();
  }

  setAllUsersProfiles() {
    this.subscriptions.sink = this._data.allUsersProfile$.subscribe(
      (getAllUsersProfileResponse) => {
        console.log(getAllUsersProfileResponse);
        this.allUsersProfile = getAllUsersProfileResponse;
      }
    );
  }

  matchingUsersArray$ = this._data.searchQueryChangeSubject$.pipe(
    switchMap((partial) =>
      this._data.suggestNames(this.allUsersProfile, partial)
    )
  );

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
