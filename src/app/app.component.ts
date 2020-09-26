import { Component } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { timer } from 'rxjs';
import { tap, share } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  subscriptions = new SubSink();
  loading: boolean;
  constructor(private _data: DataService, private _router: Router) {
    this._router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  ngOnInit(): void {
    this.getLoggedInUser();
    timer(0, 20000)
      .pipe(
        tap((_) => {
          if (!this._data.loggedInUser) {
            this.getLoggedInUser();
          }
          if (this._data.loggedInUser) {
            this.getUserProfileById(this._data.loggedInUser?.id);
          }
        })
      )
      .subscribe(console.log);

    timer(0, 20000)
      .pipe(
        share(),
        tap((_) => this.getAllUsers())
      )
      .subscribe();

    timer(0, 20000)
      .pipe(tap((_) => this.getAllUsersProfiles()))
      .subscribe();
  }

  getLoggedInUser() {
    this.subscriptions.sink = this._data.getLoggedInUser$().subscribe(
      (loggedInUserResponse) => {
        this._data.loggedInUser = loggedInUserResponse;
        this._data.setLoggedInUser$(loggedInUserResponse);
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
        this._data.setUserProfile$(getUserProfileResponse);
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
        this._data.setAllUsers$(getAllUsersResponse);
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
        this._data.setAllUserProfile$(getAllUsersProfilesResponse);
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

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (
      routerEvent instanceof NavigationStart ||
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel
    ) {
      this.loading = false;
    }
  }
}
