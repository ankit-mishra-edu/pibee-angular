import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';
import { INotification } from '../modules/shared/interfaces/Notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject$ = new BehaviorSubject<INotification>(null);

  notificationMessage$ = this.notificationSubject$
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor(private _notificationsService: NotificationsService) {}

  setNotification(notification: INotification) {
    this.notificationSubject$.next(notification);
  }

  getNotificationMessage(): Observable<INotification> {
    return this.notificationMessage$;
  }

  notify(notification: INotification) {
    if (notification.type == 'Success') {
      this._success(notification);
    } else if (notification.type == 'Error') {
      this._error(notification);
    }
  }

  private _success(notification: INotification) {
    const toast = this._notificationsService.success(
      notification.title,
      notification.message,
      {
        timeOut: 2000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
      }
    );
    return toast;
  }

  private _error(notification: INotification) {
    const toast = this._notificationsService.error(
      notification.title,
      notification.message,
      {
        timeOut: 2000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
      }
    );
    return toast;
  }

  private _alert(notification: INotification) {
    const toast = this._notificationsService.alert(
      notification.title,
      notification.message,
      {
        timeOut: 2000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
      }
    );
    return toast;
  }

  private _warn(notification: INotification) {
    const toast = this._notificationsService.warn(
      notification.title,
      notification.message,
      {
        timeOut: 2000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
      }
    );
    return toast;
  }

  private _info(notification: INotification) {
    const toast = this._notificationsService.info(
      notification.title,
      notification.message,
      {
        timeOut: 2000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
      }
    );
    return toast;
  }
}
