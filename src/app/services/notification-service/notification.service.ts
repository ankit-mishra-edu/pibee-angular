import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces/User';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject$ = new BehaviorSubject<{
    type: String;
    title: String;
    message: String;
  }>(null);

  notificationMessage$ = this.notificationSubject$
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor(private _notificationsService: NotificationsService) {}

  setNotification(type: String, title: String, message: String) {
    this.notificationSubject$.next({
      type: type,
      title: title,
      message: message,
    });
  }

  getNotificationMessage(): Observable<any> {
    return this.notificationMessage$;
  }

  notify(
    type: String,
    title: any,
    content: any,
    override?: any,
    context?: any
  ) {
    if (type == 'success') {
      this.success(title, content, override, context);
    } else if (type == 'error') {
      this.error(title, content, override, context);
    }
  }

  success(title: any, content: any, override?: any, context?: any) {
    const toast = this._notificationsService.success(title, content, {
      timeOut: 2000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
    });
    return toast;
  }

  error(title: any, content?: any, override?: any, context?: any) {
    const toast = this._notificationsService.error(title, content, {
      timeOut: 2000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
    });
    return toast;
  }

  alert(title: any, content?: any, override?: any, context?: any) {}

  warn(title: any, content?: any, override?: any, context?: any) {}

  info(title: any, content?: any, override?: any, context?: any) {}
}
