import { SubSink } from 'subsink';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/app-interface/User';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/app-service/auth-service/auth.service';
import { DataService } from 'src/app/app-service/data-service/data.service';
import { IProfile } from 'src/app/app-interface/Profile';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  notificationTitle: string;
  notificationMessage: string;
  loggedInUser$: Observable<IUser>;
  userProfile$ = this._data.userProfile$;
  subscriptions = new SubSink();
  numberArray = [1, 2, 3];

  allUsersProfile: IProfile[];
  usernameChange = new Subject<string>();

  constructor(
    private _auth: AuthService,
    private _data: DataService,
    private _route: Router,
    private _activatedRoute: ActivatedRoute,
    private _notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.loggedInUser$ = this._data.loggedInUser$;
    this._activatedRoute.params.subscribe((params) => {
      this.notificationTitle = params?.notificationTitle;
      this.notificationMessage = params?.notificationMessage;
      console.log(this.notificationTitle);
      console.log(this.notificationMessage);
    });
    console.log(this.notify(this.notificationTitle, this.notificationMessage));

    // if (this._data.loggedInUser) {
    this.setAllUsersProfiles();
    // }
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

  notify(title: string, message: string) {
    this._notificationsService.success(title, message, {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
    });
  }
}
