import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

// All Sevices
import { AuthService } from '../../../services/auth.service';
import { DataService } from '../../../services/data.service';

// All Intefaces
import { IUser } from '../../../modules/shared/interfaces/User';

// All Related to Forms
import { FormGroup } from '@angular/forms';
import {
  isValid,
  isInValid,
} from '../../../modules/shared/validators/custom.validator';
import { AuthenticationForms } from '../../shared/forms/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isValid = isValid;
  isInValid = isInValid;
  subscriptions = new SubSink();

  signInForm: FormGroup = AuthenticationForms.LoginForm();

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
    this._data.setLoggedInUser$(loggedInUser);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
