import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { IUser } from '../../../modules/shared/interfaces/User';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { DataService } from '../../../services/data.service';
import {
  isValid,
  isInValid,
  patternValidator,
} from '../../../modules/shared/validators/custom.validator';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  isValid = isValid;
  isInValid = isInValid;
  subscriptions = new SubSink();
  loggedInUser: IUser = this._data.loggedInUser;

  changePasswordForm = new FormBuilder().group({
    id: [this.loggedInUser.id],
    oldPassword: ['', [Validators.required]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          '(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}'
        ),
        patternValidator(/\d/, { hasNumber: true }),
        patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        patternValidator(/[a-z]/, { hasSmallCase: true }),
      ],
    ],
  });

  value(controlName: string) {
    return this.changePasswordForm.get(controlName);
  }

  constructor(
    private _auth: AuthService,
    private _data: DataService,
    private _route: Router
  ) {}

  ngOnInit(): void {}

  confirmUser() {
    let loginFormData = {
      username: this.loggedInUser.username,
      password: this.value('oldPassword').value,
      email: 'amishm7@gmail.com',
    };
    this.subscriptions.sink = this._auth.LogIn(loginFormData).subscribe(
      (logInResponse) => {
        console.log(logInResponse);
        this.changePassword();
      },

      (logInError) => {
        console.log(logInError);
        alert(logInError.error);
      },

      () => {
        console.log('Login() service called Successfully');
      }
    );
  }

  changePassword() {
    this.subscriptions.sink = this._auth
      .EditUserDetails(this.changePasswordForm.value)
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
