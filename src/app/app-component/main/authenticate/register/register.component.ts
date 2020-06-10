import { SubSink } from 'subsink';
import { IUser } from 'src/app/app-interface/User';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/app-service/auth-service/auth.service';
import { DataService } from 'src/app/app-service/data-service/data.service';
import {
  FormBuilder,
  Validators,
  ValidationErrors,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  usersArray: IUser[];
  subscriptions = new SubSink();

  signUpForm = new FormBuilder().group({
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
        this.patternValidator(/\d/, { hasNumber: true }),
        this.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        this.patternValidator(/[a-z]/, { hasSmallCase: true }),
      ],
    ],
  });

  constructor(
    private _auth: AuthService,
    private _data: DataService,
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
    if (this.usersArray) {
      for (let user of this.usersArray) {
        if (user[controlName] == control.value) {
          validationStatus = true;
          break;
        }
      }
    }

    return of(validationStatus ? { alreadyTakenError: true } : null);
  }

  patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  isInValid(controlName: string) {
    return (
      this.signUpForm.get(controlName).invalid &&
      (this.signUpForm.get(controlName).touched ||
        this.signUpForm.get(controlName).dirty)
    );
  }

  isValid(controlName: string) {
    return (
      this.signUpForm.get(controlName).valid &&
      this.signUpForm.get(controlName).dirty
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
