import { Component, OnInit, Input } from '@angular/core';
import { IUser } from 'src/app/app-interface/User';
import { SubSink } from 'subsink';
import { AuthService } from 'src/app/app-service/auth-service/auth.service';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  subscriptions = new SubSink();

  loggedInUser: IUser;

  constructor(private _auth: AuthService, private _route: Router) {}

  ngOnInit(): void {
    this.loggedInUser = this._auth.GetLoggedInUser();
  }
}
