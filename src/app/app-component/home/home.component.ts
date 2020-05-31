import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/app-interface/User';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from 'src/app/app-service/auth-service/auth.service';
import { DataService } from 'src/app/app-service/data-service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loggedInUser$: Observable<IUser>;
  subscriptions = new SubSink();

  searchTerm: string;
  usernameChange = new Subject<string>();

  constructor(
    private _auth: AuthService,
    private _data: DataService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.loggedInUser$ = this._data.loggedInUser$;
  }

  usernameList = this.usernameChange.pipe(
    switchMap((partial) => this._data.suggestNames(partial))
  );
}
