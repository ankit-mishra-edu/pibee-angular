import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/shared/components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import(`./modules/auth/auth.module`).then((m) => m.AuthModule),
  },
  {
    path: 'chat',
    loadChildren: () =>
      import(`./modules/chat/chat.module`).then((m) => m.ChatModule),
  },
  {
    path: 'post',
    loadChildren: () =>
      import(`./modules/post/post.module`).then((m) => m.PostModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import(`./modules/user/user.module`).then((m) => m.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
