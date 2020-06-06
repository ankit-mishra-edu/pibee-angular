import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/app-service/auth-service/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SubSink } from 'subsink';
import { IUser } from 'src/app/app-interface/User';
import { DataService } from 'src/app/app-service/data-service/data.service';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.scss'],
})
export class EditDetailsComponent implements OnInit, OnDestroy {
  subscriptions = new SubSink();
  isUserConfirmed: boolean = false;
  loggedInUser: IUser = this._data.loggedInUser;
  loginFormData = {
    username: this.loggedInUser.username,
    password: '',
    email: 'amishm7@gmail.com',
  };
  editDetailFormData: IUser = {
    id: this.loggedInUser.id,
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  };

  constructor(
    private _auth: AuthService,
    private _data: DataService,
    private _route: Router
  ) {}

  ngOnInit(): void {}

  confirmUser() {
    this.subscriptions.sink = this._auth.LogIn(this.loginFormData).subscribe(
      (logInResponse) => {
        console.log(logInResponse);
        localStorage.setItem('username', logInResponse.user.username);
        this.editDetailFormData = logInResponse.user;
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
      .EditUserDetails(this.editDetailFormData)
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
