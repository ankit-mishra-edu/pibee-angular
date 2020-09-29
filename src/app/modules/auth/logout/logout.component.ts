import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { IUser } from '../../../modules/shared/interfaces/User';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { DataService } from '../../../services/data.service';
import { NotificationService } from '../../../services/notification.service';
import { INotification } from '../../shared/interfaces/Notification';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit, OnDestroy {
  loggedInUser: IUser;
  subscriptions = new SubSink();

  notification: INotification = <INotification>{};

  constructor(
    private _router: Router,
    private _auth: AuthService,
    private _data: DataService,
    private _notification: NotificationService
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
          this._data.setLoggedInUser$(null);
          console.log(logOutResponse);
          this.notification.type = 'Success';
          this.notification.title = 'Logout';
          this.notification.message = 'Logged out successfully...';
          console.log(this.notification);
          this._notification.setNotification(this.notification);
          this._router.navigate(['']);
        },

        (logOutError) => {
          console.log(logOutError);
          this.notification.type = 'Error';
          this.notification.title = 'Logout';
          this.notification.message = 'Could not log out successfully...';
          this._notification.setNotification(this.notification);
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
