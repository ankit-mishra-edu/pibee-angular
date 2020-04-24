import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/app-service/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userData;
  constructor(private _auth : AuthService, private _route : Router) { }
  
  ngOnInit(): void {
    this.userData = {
      "username" : '' ,
      "first_name" : '' ,
      "last_name" : '' ,
      "email" : '',
      "password" : '',
      "is_active" : true
    }
  }

  signUp(){
    this._auth.Register(this.userData).subscribe(
      signUpResponse => {
        localStorage.setItem('Token', signUpResponse.token)
        console.log(signUpResponse)
        this._route.navigate(['login'])
      },
      signUpError => {
        console.log(signUpError)
        alert(signUpError.error['username'])
      },
      () => {console.log("Sign up Successful")}
    )
  }

}
