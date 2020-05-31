import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './app-service/auth-service/auth.service';
import { SubSink } from 'subsink';
import { IUser } from './app-interface/User';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor() {}

  ngOnInit(): void {}
}
