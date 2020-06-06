import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IUser } from 'src/app/app-interface/User';
import { SubSink } from 'subsink';
import { DataService } from 'src/app/app-service/data-service/data.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  loggedInUser$: Observable<IUser>;
  subscriptions = new SubSink();

  allUsersArray: IUser[];
  usernameChange = new Subject<string>();
  constructor(public _data: DataService) {}

  ngOnInit(): void {
    this.loggedInUser$ = this._data.loggedInUser$;
  }

  matchingUsersArray = this.usernameChange.pipe(
    switchMap((partial) => this._data.suggestNames(this.allUsersArray, partial))
  );
}
