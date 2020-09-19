import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { SharedRoutingModule } from './shared-routing.module';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { HomeComponent } from './components/home/home.component';
import { LeftBarComponent } from './components/left-bar/left-bar.component';
import { RightBarComponent } from './components/right-bar/right-bar.component';

@NgModule({
  declarations: [
    SearchBoxComponent,
    HomeComponent,
    LeftBarComponent,
    RightBarComponent,
  ],
  imports: [
    CommonModule,
    // BrowserModule,
    // HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedRoutingModule,
  ],
  exports: [
    SearchBoxComponent,
    HomeComponent,
    LeftBarComponent,
    RightBarComponent,
  ],
})
export class SharedModule {}
