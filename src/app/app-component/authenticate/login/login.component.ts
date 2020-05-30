import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/app-service/auth-service/auth.service';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';
import { IUser } from 'src/app/app-interface/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginData;
  subscriptions = new SubSink();

  constructor(private _auth: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this.loginData = {
      user: {
        username: '',
        password: '',
        email: 'amishm7@gmail.com',
      },
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
    this._auth.ChangeLoggedInUser$(loggedInUser);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
