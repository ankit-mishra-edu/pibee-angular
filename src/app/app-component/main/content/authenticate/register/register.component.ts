import { SubSink } from 'subsink';
import { IUser } from 'src/app/app-interface/User';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/app-service/auth-service/auth.service';
import { DataService } from 'src/app/app-service/data-service/data.service';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { of } from 'rxjs';
import {
  patternValidator,
  isValid,
  isInValid,
} from 'src/app/app-validators/custom.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  usersArray: IUser[];
  isValid = isValid;
  isInValid = isInValid;
  subscriptions = new SubSink();

  signUpForm = new FormBuilder().group({
    id: [''],
    username: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(150)],
      this.validateNotTaken.bind(this),
    ],
    first_name: [''],
    last_name: [''],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\\.([a-zA-Z]{2,5})$'
        ),
      ],
      this.validateNotTaken.bind(this),
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          '(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}'
        ),
        patternValidator(/\d/, { hasNumber: true }),
        patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        patternValidator(/[a-z]/, { hasSmallCase: true }),
      ],
    ],
  });

  value(controlName: string) {
    return this.signUpForm.get(controlName);
  }

  constructor(
    private _auth: AuthService,
    public _data: DataService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.subscriptions.sink = this._data.GetAllUsers().subscribe(
      (getAllUsersResponse) => {
        console.log(getAllUsersResponse);
        this.usersArray = getAllUsersResponse;
      },

      (getAllUsersError) => {
        console.log(getAllUsersError);
      },

      () => {
        console.log('All Users fetched successfully');
      }
    );
  }

  signUp() {
    this.subscriptions.sink = this._auth
      .Register(this.signUpForm.value)
      .subscribe(
        (signUpResponse) => {
          localStorage.setItem('Token', signUpResponse.key);
          localStorage.setItem('user', signUpResponse.user.toString());
          console.log(signUpResponse);
          alert('Hit the link sent to your email to activate acount');
        },
        (signUpError) => {
          console.log(signUpError);
          alert(signUpError.error);
        },
        () => {
          console.log('Sign up Successful');
          this._route.navigate(['login']);
        }
      );
  }
  validateNotTaken(control: AbstractControl) {
    let validationStatus: boolean = false;
    const controlName = Object.keys(control.parent.controls).find(
      (key) => control.parent.controls[key] === control
    );
    if (this._data.allUsersArray) {
      for (let user of this._data.allUsersArray) {
        if (user[controlName] == control.value) {
          validationStatus = true;
          break;
        }
      }
    }

    return of(validationStatus ? { alreadyTakenError: true } : null);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
