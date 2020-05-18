import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './app-service/auth-service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loggedIn : boolean;
  username : string;
  title = 'piBee';

  constructor(private _auth : AuthService, private _route : Router) { }


  ngOnInit(): void {
    this.isLoggedIn();    
  }

  isLoggedIn() {
    if (localStorage.getItem('isLoggedIn') == "true") {
      this.loggedIn = true;
      this.username = localStorage.getItem('username')
    }
    else if (localStorage.getItem('isLoggedIn') == "false") {
      this.loggedIn = false;
    }
    return(this.loggedIn)
  }

  deactivateUser(){
    let deactivateFormData = {
      "user" : {
        "username" : localStorage.getItem('username'),
        "is_active" : false
      }
    }
    this._route.navigate(['logout']);
    this._auth.EditUserDetails(deactivateFormData).subscribe(
      deactivateUserResponse => {
        localStorage.setItem('isLoggedIn', 'false')
        localStorage.setItem('username', null)
        localStorage.setItem('password', null)
        localStorage.setItem('user', null)
        localStorage.setItem('Token', "")
        console.log(deactivateUserResponse)
      },

      deactivateUserError => {
        console.log(deactivateUserError)
        alert(deactivateUserError.error)
      },

      () => {
        console.log("Deactivation service called Successfully")
      }
    )
  }
}
