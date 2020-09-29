import { SubSink } from 'subsink';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

// All Interfaces
import { IUser } from '../../../modules/shared/interfaces/User';

// All Services
import { AuthService } from '../../../services/auth.service';
import { DataService } from '../../../services/data.service';

// All related to Forms
import { FormGroup } from '@angular/forms';
import {
  isValid,
  isInValid,
} from '../../../modules/shared/validators/custom.validator';
import { UserDetailsForms } from '../../shared/forms/forms';

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
  loggedInUser$: Observable<IUser> = this._data.getLoggedInUser$();
  allUsers$: Observable<IUser[]> = this._data.getAllUsers$();

  confirmUserForm: FormGroup = UserDetailsForms.ConfirmUserForm(
    this.loggedInUser
  );

  editDetailsForm: FormGroup = UserDetailsForms.EditDetailsForm(
    <IUser>null,
    <IUser[]>null
  );

  value_c(controlName: string) {
    return this.confirmUserForm.get(controlName);
  }

  value_e(controlName: string) {
    return this.editDetailsForm.get(controlName);
  }

  constructor(
    private _route: Router,
    private _auth: AuthService,
    private _data: DataService
  ) {}

  ngOnInit(): void {
    this.allUsers$.subscribe((allUsers: IUser[]) => {
      this.editDetailsForm = UserDetailsForms.EditDetailsForm(
        this.loggedInUser,
        allUsers
      );
    });
  }

  confirmUser() {
    this.value_c('username').setValue(this.loggedInUser.username);
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
