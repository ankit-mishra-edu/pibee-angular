import { SubSink } from 'subsink';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

// All related to Forms
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  isValid,
  isInValid,
} from '../../../modules/shared/validators/custom.validator';
import { AuthenticationForms } from '../../../modules/shared/forms/forms';

// All Services
import { AuthService } from '../../../services/auth.service';
import { DataService } from '../../../services/data.service';
import { NotificationService } from '../../../services/notification.service';

// All Interfaces
import { IUser } from '../../../modules/shared/interfaces/User';
import { INotification } from '../../shared/interfaces/Notification';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  isValid = isValid;
  isInValid = isInValid;
  subscriptions = new SubSink();

  notification: INotification = <INotification>{};
  allUsers$: Observable<IUser[]> = this._data.getAllUsers$();

  signUpForm: FormGroup = AuthenticationForms.SignUpForm(<IUser[]>null);

  value(controlName: string) {
    return this.signUpForm.get(controlName);
  }

  constructor(
    private _auth: AuthService,
    public _data: DataService,
    private _route: Router,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.allUsers$.subscribe((allUsers: IUser[]) => {
      this.signUpForm = AuthenticationForms.SignUpForm(allUsers);
    });
  }

  signUp() {
    this.subscriptions.sink = this._auth
      .Register(this.signUpForm.value)
      .subscribe(
        (signUpResponse) => {
          localStorage.setItem('Token', signUpResponse.key);
          localStorage.setItem('user', signUpResponse.user.toString());
          console.log(signUpResponse);

          this.notification.type = 'Success';
          this.notification.title = 'Registration';
          this.notification.message = 'Registered successfully';

          this._notificationService.setNotification(this.notification);
          alert(
            'Hit the link sent to ' +
              signUpResponse.user.email +
              ' to activate acount'
          );

          this._route.navigate(['']);
        },
        (signUpError) => {
          console.log(signUpError);

          this.notification.type = 'Error';
          this.notification.title = 'Registration';
          this.notification.message = 'Try contacting admin';

          this._notificationService.setNotification(this.notification);
          // alert(signUpError.error);
          this._route.navigate(['']);
        },
        () => {
          console.log('Sign up service called Successfully');
        }
      );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
