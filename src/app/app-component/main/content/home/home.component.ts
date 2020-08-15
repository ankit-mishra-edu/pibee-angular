import { SubSink } from 'subsink';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/app-interface/User';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/app-service/auth-service/auth.service';
import { DataService } from 'src/app/app-service/data-service/data.service';
import { IProfile } from 'src/app/app-interface/Profile';

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

  constructor(private _data: DataService) {}

  ngOnInit(): void {
    this.loggedInUser$ = this._data.loggedInUser$;
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
}
