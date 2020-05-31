import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/app-service/auth-service/auth.service';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { IUser } from 'src/app/app-interface/User';
import { DataService } from 'src/app/app-service/data-service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginData;
  subscriptions = new SubSink();

  constructor(
    private _auth: AuthService,
    private _data: DataService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.loginData = {
      username: '',
      password: '',
      email: 'amishm7@gmail.com',
    };
  }

  logIn() {
    this.subscriptions.sink = this._auth.LogIn(this.loginData).subscribe(
      (logInResponse) => {
        console.log(logInResponse);
        sessionStorage.setItem('userToken', JSON.stringify(logInResponse));
        this.changeLoggedInUser(logInResponse.user);
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

  changeLoggedInUser(loggedInUser: IUser) {
    this._data.ChangeLoggedInUser$(loggedInUser);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
