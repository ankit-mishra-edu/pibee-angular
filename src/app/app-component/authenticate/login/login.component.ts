import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/app-service/auth-service/auth.service';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginData ;
  subscriptions = new SubSink();
  
  constructor(private _auth : AuthService, private _router : Router) { }

  ngOnInit(): void {
    this.loginData = {
      "user" : {
        "username" : '',
        "password" : '',
        "email" : 'amishm7@gmail.com'
      }
    }
  }

  logIn(){
    //console.log(this.loginData)
    this.subscriptions.sink = this._auth.LogIn(this.loginData)
    .subscribe(
      logInResponse => {
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('username', logInResponse.user.username)
        localStorage.setItem('password', logInResponse.user.password)
        localStorage.setItem('Token', logInResponse.key)
        localStorage.setItem('user', logInResponse.user.id.toString())
        console.log(logInResponse)
        this._router.navigate([''])
      },
      
      logInError => {
        console.log(logInError)
        alert(logInError);
      },

      () => {console.log("Logged In Successfully")}
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  

}
