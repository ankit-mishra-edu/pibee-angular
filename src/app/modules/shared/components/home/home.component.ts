import { SubSink } from 'subsink';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { of, merge, Observable, combineLatest } from 'rxjs';

// All Interfaces
import { IUser } from '../../../../modules/shared/interfaces/User';
import { IProfile } from '../../../../modules/shared/interfaces/Profile';
import { INotification } from '../../../../modules/shared/interfaces/Notification';

// All Services
import { DataService } from '../../../../services/data.service';
import { SpeechService } from 'src/app/services/speech.service';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  notification: INotification = <INotification>{};

  numberArray = [1, 2, 3];
  subscriptions = new SubSink();
  loggedInUser$: Observable<IUser> = this._data.getLoggedInUser$();
  userProfile$: Observable<IProfile> = this._data.getUserProfile$();
  allUserProfiles$: Observable<IProfile[]> = this._data.getAllUserProfile$();

  constructor(
    private _data: DataService,
    private _speech: SpeechService,
    private _notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.loggedInUser$ = this._data.getLoggedInUser$();
    this.showNotification();
  }

  // Get All the Typed and Spoken Keywords from SearchBox, Merge them and process
  typedKeywords$ = this._data.getSearchBoxQuery$();

  spokenKeywords$ = this._speech
    .getListenClicks$()
    .pipe(switchMap(() => this._speech.listen()));

  keywords$ = merge(this.typedKeywords$, this.spokenKeywords$);

  suggestedUsers$ = combineLatest([this.keywords$, this.allUserProfiles$]).pipe(
    switchMap(([keyword, allUserProfiles]) =>
      this._data.ProcessKeywords(keyword, allUserProfiles, this.suggestUsers)
    )
  );

  suggestUsers(
    keyword: string,
    allUserProfiles: IProfile[]
  ): Observable<IProfile[]> {
    let usernamesArray: IProfile[] = [];
    console.log(keyword);
    allUserProfiles?.forEach((userProfile) => {
      if (
        userProfile.address.user.username
          .toLowerCase()
          .includes(keyword.toLowerCase()) &&
        keyword != ''
      ) {
        usernamesArray.push(userProfile);
      }
    });
    console.log(usernamesArray);
    return of(usernamesArray);
  }

  getNotificationMessage() {
    this._notification
      .getNotificationMessage()
      .subscribe((message: INotification) => {
        this.notification = message;
        console.log(this.notification);
      });
  }

  showNotification() {
    this.getNotificationMessage();

    if (this.notification?.message != null) {
      this._notification.notify(this.notification);
      this._notification.setNotification(<INotification>{});
    }
  }
}
