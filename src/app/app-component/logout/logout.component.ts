import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/app-service/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _auth : AuthService, private _router : Router) { }

  ngOnInit(): void {
    this.logout()
  }

  logout(){
    if(localStorage.getItem('isLoggedIn') == 'true'){
      this._auth.LogOut().subscribe(
        logOutResponse => {
          localStorage.setItem('isLoggedIn', 'false')
          localStorage.setItem('username', null)
          localStorage.setItem('password', null)
          localStorage.setItem('user', null)
          localStorage.setItem('Token', "")
          console.log(logOutResponse)
          this._router.navigate([''])
        },
        logOutError => {
          console.log(logOutError)
          alert(logOutError.error['detail'])
        },
        () => {console.log("Logged Out Successfully")}
      )
    }

    else {
      this._router.navigate([''])
    }
    //window.location.reload()
  }

}
