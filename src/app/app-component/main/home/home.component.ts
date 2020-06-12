import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/app-interface/User';
import { AuthService } from 'src/app/app-service/auth-service/auth.service';
import { DataService } from 'src/app/app-service/data-service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  subscriptions = new SubSink();
  numberArray = [1, 2, 3];

  loggedInUser: IUser = this._data.loggedInUser;
  allUsersArray: IUser[] = this._data.allUsersArray;

  constructor(
    private _auth: AuthService,
    private _data: DataService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    if (this._data.loggedInUser) {
      this.getAllUsers();
    }
  }

  getAllUsers() {
    this.subscriptions.sink = this._data.GetAllUsers().subscribe(
      (getAllUsersResponse) => {
        console.log(getAllUsersResponse);
        this.allUsersArray = getAllUsersResponse;
      },

      (getAllUsersError) => {
        console.log(getAllUsersError);
      },

      () => {
        console.log('All Users fetched successfully');
      }
    );
  }

  matchingUsersArray = this._data.searchQueryChangeSubject$.pipe(
    switchMap((partial) =>
      this._data.searchQuery(this._data.allUsersArray, partial)
    )
  );
}
