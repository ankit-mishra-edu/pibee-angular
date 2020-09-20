import { of } from 'rxjs';
import { SubSink } from 'subsink';
import { IUser } from '../../../modules/shared/interfaces/User';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import {
  isValid,
  isInValid,
} from '../../../modules/shared/validators/custom.validator';

import { AuthService } from '../../../services/auth.service';
import { DataService } from '../../../services/data.service';
import { NotificationService } from '../../../services/notification.service';

import { SignUp } from '../../../modules/shared/forms/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  isValid = isValid;
  isInValid = isInValid;
  allUsersArray: IUser[] = null;
  subscriptions = new SubSink();

  signUpForm = SignUp.SignUpForm(this.allUsersArray);

  value(controlName: string) {
    return this.signUpForm.get(controlName);
  }

  constructor(
    private _auth: AuthService,
    public _data: DataService,
    private _route: Router,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.setAllUsers();
  }

  setAllUsers() {
    this.subscriptions.sink = this._data
      .getAllUsers$()
      .subscribe((getAllUsersResponse) => {
        console.log(getAllUsersResponse);
        this.allUsersArray = getAllUsersResponse;

        this.signUpForm = SignUp.SignUpForm(this.allUsersArray);
      });
  }

  signUp() {
    this.subscriptions.sink = this._auth
      .Register(this.signUpForm.value)
      .subscribe(
        (signUpResponse) => {
          localStorage.setItem('Token', signUpResponse.key);
          localStorage.setItem('user', signUpResponse.user.toString());
          console.log(signUpResponse);
          this._notificationService.setNotification(
            'success',
            'Registration',
            'Registered successfully'
          );
          alert(
            'Hit the link sent to ' +
              signUpResponse.user.email +
              ' to activate acount'
          );

          this._route.navigate(['']);
        },
        (signUpError) => {
          console.log(signUpError);
          this._notificationService.setNotification(
            'error',
            'Registration',
            'Try contacting admin'
          );
          // alert(signUpError.error);
          this._route.navigate(['']);
        },
        () => {
          console.log('Sign up service called Successfully');
        }
      );
  }

  validateNotTaken(control: AbstractControl) {
    let validationStatus: boolean = false;
    const controlName = Object.keys(control.parent.controls).find(
      (key) => control.parent.controls[key] === control
    );
    if (this.allUsersArray) {
      for (let user of this.allUsersArray) {
        if (user[controlName] == control.value) {
          validationStatus = true;
          break;
        }
      }
    }

    return of(validationStatus ? { alreadyTakenError: true } : null);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
