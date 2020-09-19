import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    EditDetailsComponent,
    ChangePasswordComponent,
    EditProfileComponent,
    ViewProfileComponent,
  ],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, UserRoutingModule],
})
export class UserModule {}
