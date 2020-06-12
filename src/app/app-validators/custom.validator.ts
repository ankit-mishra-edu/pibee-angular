import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormGroup,
} from '@angular/forms';
import { of } from 'rxjs';

export function validateNotTaken(control: AbstractControl, toBeSearched) {
  let validationStatus: boolean = false;
  const controlName = Object.keys(control.parent.controls).find(
    (key) => control.parent.controls[key] === control
  );
  if (toBeSearched) {
    for (let user of toBeSearched) {
      if (user[controlName] == control.value) {
        validationStatus = true;
        break;
      }
    }
  }

  return of(validationStatus ? { alreadyTakenError: true } : null);
}

export function patternValidator(
  regex: RegExp,
  error: ValidationErrors
): ValidatorFn {
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

export function isInValid(form, controlName: string) {
  return (
    form.get(controlName).invalid &&
    (form.get(controlName).touched || form.get(controlName).dirty)
  );
}

export function isValid(form, controlName: string) {
  return form.get(controlName).valid && form.get(controlName).dirty;
}
