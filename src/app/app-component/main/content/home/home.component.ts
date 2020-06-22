import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/app-interface/User';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/app-service/auth-service/auth.service';
import { DataService } from 'src/app/app-service/data-service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loggedInUser$: Observable<IUser>;
  userProfile$ = this._data.userProfile$;
  subscriptions = new SubSink();
  numberArray = [1, 2, 3];

  allUsersArray: IUser[];
  usernameChange = new Subject<string>();

  constructor(
    private _auth: AuthService,
    private _data: DataService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.loggedInUser$ = this._data.loggedInUser$;
    if (this._data.loggedInUser) {
      this.setAllUsers();
    }
  }

  setAllUsers() {
    this.subscriptions.sink = this._data.allUsersArray$.subscribe(
      (getAllUsersResponse) => {
        this.allUsersArray = getAllUsersResponse;
      }
    );
  }

  matchingUsersArray = this._data.searchQueryChangeSubject$.pipe(
    switchMap((partial) => this._data.suggestNames(this.allUsersArray, partial))
  );
}
