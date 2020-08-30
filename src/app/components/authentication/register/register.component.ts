import { of } from 'rxjs';
import { SubSink } from 'subsink';
import { IUser } from 'src/app/interfaces/User';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { DataService } from 'src/app/services/data-service/data.service';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import {
  isValid,
  isInValid,
  patternValidator,
} from 'src/app/validators/custom.validator';
import { NotificationService } from 'src/app/services/notification-service/notification.service';

import { SignUp } from '../../../forms/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  isValid = isValid;
  isInValid = isInValid;
  allUsersArray: IUser[];
  subscriptions = new SubSink();

  // signUpForm = new FormBuilder().group({
  //   id: [''],
  //   username: [
  //     '',
  //     [Validators.required, Validators.minLength(3), Validators.maxLength(150)],
  //     this.validateNotTaken.bind(this),
  //   ],
  //   first_name: [''],
  //   last_name: [''],
  //   email: [
  //     '',
  //     [
  //       Validators.required,
  //       Validators.pattern(
  //         '^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\\.([a-zA-Z]{2,5})$'
  //       ),
  //     ],
  //     this.validateNotTaken.bind(this),
  //   ],
  //   password: [
  //     '',
  //     [
  //       Validators.required,
  //       Validators.minLength(8),
  //       Validators.pattern(
  //         '(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}'
  //       ),
  //       patternValidator(/\d/, { hasNumber: true }),
  //       patternValidator(/[A-Z]/, { hasCapitalCase: true }),
  //       patternValidator(/[a-z]/, { hasSmallCase: true }),
  //     ],
  //   ],
  // });
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
    this.subscriptions.sink = this._data.allUsersArray$.subscribe(
      (getAllUsersResponse) => {
        console.log(getAllUsersResponse);
        this.allUsersArray = getAllUsersResponse;

        this.signUpForm = SignUp.SignUpForm(this.allUsersArray);
      }
    );
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
