import { Component } from '@angular/core';
import { timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { DataService } from 'src/app/services/data-service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  subscriptions = new SubSink();
  constructor(private _data: DataService) {}

  ngOnInit(): void {
    timer(0, 20000)
      .pipe(
        tap((_) => {
          if (!this._data.loggedInUser) {
            this.getLoggedInUser();
          }
          if (this._data.loggedInUser) {
            this.getUserProfileById(this._data.loggedInUser.id);
          }
        })
      )
      .subscribe(console.log);

    timer(0, 20000)
      .pipe(tap((_) => this.getAllUsers()))
      .subscribe(console.log);

    timer(0, 20000)
      .pipe(tap((_) => this.getAllUsersProfiles()))
      .subscribe(console.log);
  }

  getLoggedInUser() {
    this.subscriptions.sink = this._data.GetLoggedInUser().subscribe(
      (loggedInUserResponse) => {
        this._data.loggedInUser = loggedInUserResponse;
        console.log(this._data.loggedInUser);
      },

      (loggedInUserError) => {
        console.log(loggedInUserError);
      },

      () => {
        console.log('GetLoggedInUser() service called successfully');
      }
    );
  }

  getUserProfileById(id: number) {
    this.subscriptions.sink = this._data.GetUserProfileById(id).subscribe(
      (getUserProfileResponse) => {
        this._data.userProfileSubject$.next(getUserProfileResponse);
      },

      (getUserProfileError) => {
        console.log(getUserProfileError);
      },

      () => {
        console.log('GetUserProfileById() service called successfully');
      }
    );
  }

  getAllUsers() {
    this.subscriptions.sink = this._data.GetAllUsers().subscribe(
      (getAllUsersResponse) => {
        // this._data.allUsersArray = getAllUsersResponse;
        this._data.allUsersSubject$.next(getAllUsersResponse);
        // console.log(this._data.allUsersArray);
      },

      (getAllUsersError) => {
        console.log(getAllUsersError);
      },

      () => {
        console.log('GetAllUsers() service called successfully');
      }
    );
  }

  getAllUsersProfiles() {
    this.subscriptions.sink = this._data.GetAllUsersProfiles().subscribe(
      (getAllUsersProfilesResponse) => {
        this._data.allUsersProfileSubject$.next(getAllUsersProfilesResponse);
        // this._data.allUsersProfileArray = getAllUsersProfilesResponse;
      },

      (getAllUsersProfilesError) => {
        console.log(getAllUsersProfilesError);
      },

      () => {
        console.log('GetAllUsersProfiles() service called successfully');
      }
    );
  }
}
