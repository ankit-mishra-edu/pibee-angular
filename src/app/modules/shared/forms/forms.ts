import { SubSink } from 'subsink';
import { FormBuilder, Validators } from '@angular/forms';
import {
  validateNotExists,
  patternValidator,
  validateNotTakenByOthers,
} from '../validators/custom.validator';
import { IUser } from '../../../modules/shared/interfaces/User';

export class AuthenticationForms {
  subscriptions = new SubSink();
  allUsersArray: IUser[];

  constructor() {}

  public static LoginForm() {
    let signInForm = new FormBuilder().group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: 'amishm766@gmail.com',
    });
    return signInForm;
  }

  public static SignUpForm(allUsers: IUser[]) {
    let signUpForm = new FormBuilder().group({
      id: [''],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(150),
        ],
        validateNotExists(allUsers).bind(this),
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
        validateNotExists(allUsers).bind(this),
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
    return signUpForm;
  }
}

export class UserDetailsForms {
  public static ConfirmUserForm(currentUser: IUser) {
    let confirmUserForm = new FormBuilder().group({
      username: [currentUser.username],
      password: ['', [Validators.required]],
      email: 'amishm766@gmail.com',
    });
    return confirmUserForm;
  }

  public static EditDetailsForm(currentUser: IUser, allUsers: IUser[]) {
    let editDetailsForm = new FormBuilder().group({
      id: [{ value: null, disabled: false }],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(150),
        ],
        validateNotTakenByOthers(currentUser, allUsers).bind(this),
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
        validateNotTakenByOthers(currentUser, allUsers).bind(this),
      ],
    });
    return editDetailsForm;
  }

  public static EditProfileForm(currentUser: IUser) {
    let profileForm = new FormBuilder().group({
      user: [currentUser?.id],
      bio: ['', [Validators.maxLength(150)]],
      address: new FormBuilder().group({
        user: [currentUser],
        city: [''],
        state: [''],
        street: [''],
        zip_code: [''],
      }),
      birth_date: [null],
      email_confirmed: [false],
      image: [null],
    });
    return profileForm;
  }
}
