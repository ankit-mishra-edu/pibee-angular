import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post/post.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';

@NgModule({
  declarations: [PostComponent, ViewPostComponent, EditPostComponent],
  imports: [
    CommonModule,
    // BrowserModule,
    // HttpClientModule,
    // FormsModule,
    // ReactiveFormsModule,
    PostRoutingModule,
  ],
})
export class PostModule {}
