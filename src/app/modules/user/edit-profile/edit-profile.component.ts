import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

// All Services
import { AuthService } from '../../../services/auth.service';
import { DataService } from '../../../services/data.service';

// All Interfaces
import { IUser } from '../../shared/interfaces/User';

// All related to Forms
import { FormGroup } from '@angular/forms';
import {
  isValid,
  isInValid,
} from '../../../modules/shared/validators/custom.validator';
import { UserDetailsForms } from '../../shared/forms/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  isValid = isValid;
  isInValid = isInValid;
  subscriptions = new SubSink();
  loggedInUser: IUser = this._data.loggedInUser;

  editProfileForm: FormGroup = UserDetailsForms.EditProfileForm(
    this.loggedInUser
  );

  value(controlName: string) {
    return this.editProfileForm.get(controlName);
  }

  constructor(
    private _auth: AuthService,
    private _data: DataService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.setUserProfile();
  }

  setUserProfile() {
    this.subscriptions.sink = this._data
      .getUserProfile$()
      .subscribe((profileResponse) => {
        console.log(profileResponse);
        profileResponse ? delete profileResponse.image : {};
        this.editProfileForm.patchValue(profileResponse ? profileResponse : {});
      });
  }

  editProfile() {
    this.editProfileForm.removeControl('image');
    console.log(this.editProfileForm.value);
    this.subscriptions.sink = this._auth
      .EditProfile(this.editProfileForm.value)
      .subscribe(
        (editProfileResponse) => {
          console.log(editProfileResponse);
          this._data.setUserProfile$(editProfileResponse);
          this._router.navigate(['']);
        },
        (editProfileError) => {
          console.log(editProfileError);
        },
        () => {
          console.log('Edit profile Service called Successfully');
        }
      );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
