import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/app-service/auth-service/auth.service';
import { SubSink } from 'subsink';
import { IUser } from 'src/app/app-interface/User';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit, OnDestroy {
  loggedInUser: IUser;
  subscriptions = new SubSink();

  constructor(private _auth: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this.loggedInUser = this._auth.GetLoggedInUser();
    this.logout();
  }

  logout() {
    if (this.loggedInUser) {
      this.subscriptions.sink = this._auth.LogOut().subscribe(
        (logOutResponse) => {
          sessionStorage.clear();
          console.log(logOutResponse);
          this._router.navigate(['']);
        },

        (logOutError) => {
          console.log(logOutError);
          alert(logOutError);
        },
        () => {
          console.log('Logged Out Successfully');
        }
      );
    } else {
      this._router.navigate(['']);
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
