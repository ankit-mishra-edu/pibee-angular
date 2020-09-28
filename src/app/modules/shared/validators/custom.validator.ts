import { of, Observable } from 'rxjs';
import { IUser } from '../interfaces/User';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function validateNotExists(allUsers: IUser[]): ValidatorFn {
  return (
    control: AbstractControl
  ): Observable<{ [key: string]: boolean } | null> => {
    let validationStatus: boolean = false;
    const controlName = Object.keys(control.parent.controls).find(
      (key) => control.parent.controls[key] === control
    );
    // let allUsersKey = {};
    // allUsers.map((user, index, allUsers) => {
    //   allUsersKey[user[controlName]] = user;
    // });
    // console.log(allUsersKey);
    if (allUsers) {
      for (let user of allUsers) {
        if (user[controlName] == control.value) {
          validationStatus = true;
          break;
        }
      }
    } else {
      console.log('No Data passed');
    }
    return of(validationStatus ? { alreadyTakenError: true } : null);
  };
}

export function validateNotTakenByOthers(
  currentUser: IUser,
  allUsers: IUser[]
): ValidatorFn {
  return (
    control: AbstractControl
  ): Observable<{ [key: string]: boolean } | null> => {
    let validationStatus: boolean = false;
    const controlName = Object.keys(control.parent.controls).find(
      (key) => control.parent.controls[key] === control
    );
    if (allUsers) {
      for (let user of allUsers) {
        if (
          user[controlName] == control.value &&
          user[controlName] != currentUser[controlName]
        ) {
          validationStatus = true;
          break;
        }
      }
    } else {
      console.log('No Data passed');
    }
    return of(validationStatus ? { alreadyTakenError: true } : null);
  };
}

export function patternValidator(
  regex: RegExp,
  error: ValidationErrors
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      return null;
    }
    const valid = regex.test(control.value);
    return valid ? null : error;
  };
}

export function isInValid(control: AbstractControl) {
  return control.invalid && control.touched && control.dirty;
}

export function isValid(control: AbstractControl) {
  return control.valid && (control.touched || control.dirty);
}
