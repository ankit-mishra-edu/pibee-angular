import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/app-service/auth-service/auth.service';
import { Router } from '@angular/router';
import {
  NgForm,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { SubSink } from 'subsink';
import { IUser } from 'src/app/app-interface/User';
import { DataService } from 'src/app/app-service/data-service/data.service';
import { isValid, isInValid } from 'src/app/app-validators/custom.validator';
import { of } from 'rxjs';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.scss'],
})
export class EditDetailsComponent implements OnInit, OnDestroy {
  isValid = isValid;
  isInValid = isInValid;
  subscriptions = new SubSink();
  isUserConfirmed: boolean = false;
  loggedInUser: IUser = this._data.loggedInUser;

  confirmUserForm = new FormBuilder().group({
    username: [this.loggedInUser.username],
    password: ['', [Validators.required]],
    email: 'amishm766@gmail.com',
  });

  editDetailsForm = new FormBuilder().group({
    id: [this.loggedInUser.id],
    username: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(150)],
      this.validateNotTaken.bind(this),
    ],
    first_name: [''],
    last_name: [''],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\\.([a-zA-Z]{2,5})$'
        ),
      ],
      this.validateNotTaken.bind(this),
    ],
  });

  value_c(controlName: string) {
    return this.confirmUserForm.get(controlName);
  }

  value_e(controlName: string) {
    return this.editDetailsForm.get(controlName);
  }

  constructor(
    private _auth: AuthService,
    private _data: DataService,
    private _route: Router
  ) {}

  ngOnInit(): void {}

  confirmUser() {
    this.subscriptions.sink = this._auth
      .LogIn(this.confirmUserForm.value)
      .subscribe(
        (logInResponse) => {
          localStorage.setItem('username', logInResponse.user.username);
          this.editDetailsForm.patchValue(logInResponse.user);
          this.isUserConfirmed = true;
        },

        (logInError) => {
          console.log(logInError);
          this.isUserConfirmed = false;
          alert(logInError);
        },

        () => {
          console.log('Confirmed User Successfully');
        }
      );
  }

  changeUserDetails() {
    this.subscriptions.sink = this._auth
      .EditUserDetails(this.editDetailsForm.value)
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
          console.log('Details edited Successfully');
        }
      );
  }

  validateNotTaken(control: AbstractControl) {
    let validationStatus: boolean = false;
    const controlName = Object.keys(control.parent.controls).find(
      (key) => control.parent.controls[key] === control
    );
    if (this._data.allUsersArray) {
      for (let user of this._data.allUsersArray) {
        if (
          user[controlName] == control.value &&
          user[controlName] != this.loggedInUser[controlName]
        ) {
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
