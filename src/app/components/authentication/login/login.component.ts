import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { IUser } from 'src/app/interfaces/User';
import { DataService } from 'src/app/services/data-service/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { isValid, isInValid } from 'src/app/validators/custom.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isValid = isValid;
  isInValid = isInValid;
  subscriptions = new SubSink();
  signInForm = new FormBuilder().group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    email: 'amishm766@gmail.com',
  });

  value(controlName: string) {
    return this.signInForm.get(controlName);
  }

  constructor(
    private _auth: AuthService,
    private _data: DataService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  signIn() {
    this.subscriptions.sink = this._auth.LogIn(this.signInForm.value).subscribe(
      (logInResponse) => {
        console.log(logInResponse);
        sessionStorage.setItem('userToken', JSON.stringify(logInResponse));
        this._changeLoggedInUser(logInResponse.user);
        this._router.navigate(['']);
      },

      (logInError) => {
        console.log(logInError);
        alert(logInError);
      },

      () => {
        console.log('Logged In Successfully');
      }
    );
  }

  private _changeLoggedInUser(loggedInUser: IUser) {
    this._data.ChangeLoggedInUser$(loggedInUser);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
