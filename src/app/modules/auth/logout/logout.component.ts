import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { IUser } from '../../../modules/shared/interfaces/User';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { DataService } from '../../../services/data.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit, OnDestroy {
  loggedInUser: IUser;
  subscriptions = new SubSink();

  constructor(
    private _auth: AuthService,
    private _data: DataService,
    private _router: Router,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = this._data.loggedInUser;
    this.logout();
  }

  logout() {
    if (this.loggedInUser) {
      this.subscriptions.sink = this._auth.LogOut().subscribe(
        (logOutResponse) => {
          sessionStorage.clear();
          this._data.ChangeLoggedInUser$(null);
          console.log(logOutResponse);
          this._notificationService.setNotification(
            'success',
            'Logout',
            'Logged out successfully'
          );
          this._router.navigate(['']);
        },

        (logOutError) => {
          console.log(logOutError);
          this._notificationService.setNotification(
            'error',
            'Logout',
            'Logged out successfully...'
          );
          this._router.navigate(['']);
          // alert(logOutError);
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
