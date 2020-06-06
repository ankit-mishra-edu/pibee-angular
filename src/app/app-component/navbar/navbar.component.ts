import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/app-interface/User';
import { AuthService } from 'src/app/app-service/auth-service/auth.service';
import { DataService } from 'src/app/app-service/data-service/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  title = 'piBee';
  loggedInUser: IUser;
  loggedInUser$: Observable<IUser>;
  loggedInUserChange$ = new Subject<IUser>();
  subscriptions = new SubSink();

  constructor(
    private _auth: AuthService,
    private _data: DataService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn();
  }

  isLoggedIn() {
    if (sessionStorage.length > 0) {
      this.loggedInUser = this._data.loggedInUser;
      return true;
    }
    return false;
  }

  deactivateUser() {
    let deactivateFormData = {
      user: {
        username: this.loggedInUser.username,
        is_active: false,
      },
    };
    this._route.navigate(['logout']);
    this.subscriptions.sink = this._auth
      .EditUserDetails(deactivateFormData)
      .subscribe(
        (deactivateUserResponse) => {
          sessionStorage.clear();
          console.log(deactivateUserResponse);
        },

        (deactivateUserError) => {
          console.log(deactivateUserError);
          alert(deactivateUserError.error);
        },

        () => {
          console.log('Deactivation service called Successfully');
        }
      );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
