import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { IUser } from 'src/app/app-interface/User';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/app-service/auth-service/auth.service';
import { DataService } from 'src/app/app-service/data-service/data.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  subscriptions = new SubSink();
  loggedInUser: IUser = this._data.loggedInUser;
  changePasswordFormData = {
    id: this.loggedInUser.id,
    oldPassword: '',
    password: '',
  };

  constructor(
    private _auth: AuthService,
    private _data: DataService,
    private _route: Router
  ) {}

  ngOnInit(): void {}

  confirmUser() {
    let loginFormData = {
      username: this.loggedInUser.username,
      password: this.changePasswordFormData.oldPassword,
      email: 'amishm7@gmail.com',
    };
    this.subscriptions.sink = this._auth.LogIn(loginFormData).subscribe(
      (logInResponse) => {
        console.log(logInResponse);
        this.changePassword();
      },

      (logInError) => {
        console.log(logInError);
        alert(logInError.error.error);
      },

      () => {
        console.log('Confirm user service called Successfully');
      }
    );
  }

  changePassword() {
    this.subscriptions.sink = this._auth
      .EditUserDetails(this.changePasswordFormData)
      .subscribe(
        (editUserDetailsResponse) => {
          console.log(editUserDetailsResponse);
          this._route.navigate(['']);
        },

        (editUserDetailsError) => {
          console.log(editUserDetailsError);
          alert(editUserDetailsError.error);
        },

        () => {
          console.log('Change password service called Successful');
        }
      );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
