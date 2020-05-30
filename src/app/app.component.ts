import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './app-service/auth-service/auth.service';
import { SubSink } from 'subsink';
import { IUser } from './app-interface/User';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'piBee';
  loggedInUser: IUser;
  subscriptions = new SubSink();

  constructor(private _auth: AuthService, private _route: Router) {}

  ngOnInit(): void {
    this.isLoggedIn();
  }

  isLoggedIn() {
    if (sessionStorage.length > 0) {
      this.loggedInUser = this._auth.GetLoggedInUser();
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
