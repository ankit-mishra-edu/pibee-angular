import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/app-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData ;
  constructor(private _auth : AuthService, private _router : Router) { }

  ngOnInit(): void {
    this.loginData = {
      "username" : '',
      "password" : ''
    }
  }

  logIn(){
    //console.log(this.loginData)
    this._auth.LogIn(this.loginData).subscribe(
      logInResponse => {
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('username', this.loginData.username)
        localStorage.setItem('password', this.loginData.password)
        localStorage.setItem('Token', logInResponse.token)
        console.log(logInResponse)
        this._router.navigate([''])
      },
      logInError => {
        console.log(logInError)
        alert(logInError.error.error)
      },
      () => {console.log("Logged In Successfully")}
    )
  }
  

}
