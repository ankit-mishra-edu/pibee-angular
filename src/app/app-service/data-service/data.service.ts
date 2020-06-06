import { Injectable } from '@angular/core';
import { IUser } from 'src/app/app-interface/User';
import { IProfile } from 'src/app/app-interface/Profile';
import {
  BehaviorSubject,
  Observable,
  of,
  throwError,
  interval,
  Subject,
} from 'rxjs';
import { distinctUntilChanged, catchError, delay } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  loggedInUser: IUser;
  allUsersArray: IUser[];
  baseUrl: string = 'https://pibeedjango.herokuapp.com/api/';

  public searchQueryChangeSubject$ = new Subject<string>();
  private _loggedInUserSubject$ = new BehaviorSubject<IUser>(null);

  loggedInUser$ = this._loggedInUserSubject$
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor(private _http: HttpClient) {
    if (sessionStorage.length > 0) {
      this.ChangeLoggedInUser$(
        <IUser>JSON.parse(sessionStorage.getItem('userToken')).user
      );
    }
  }

  suggestNames(userArray: IUser[], partial: string): Observable<IUser[]> {
    let usernamesArray: IUser[] = [];
    userArray.forEach((user) => {
      if (user.username.toLowerCase().includes(partial.toLowerCase())) {
        usernamesArray.push(user);
      }
    });
    console.log(usernamesArray);
    return of(usernamesArray);
  }

  ChangeLoggedInUser$(loggedInUser: IUser) {
    this._loggedInUserSubject$.next(loggedInUser);
  }

  GetLoggedInUser(): Observable<IUser> {
    return this._loggedInUserSubject$
      .asObservable()
      .pipe(distinctUntilChanged());
  }

  GetUser(id): Observable<IUser> {
    return this._http
      .get<IUser>(this.baseUrl + 'user/' + <number>id)
      .pipe(catchError(this.errorHandler));
  }

  GetAllUsers(): Observable<IUser[]> {
    return this._http
      .get<IUser[]>(this.baseUrl + 'user/')
      .pipe(catchError(this.errorHandler));
  }

  GetUserProfile(id): Observable<IProfile> {
    return this._http
      .get<IProfile>(this.baseUrl + 'user_profile/' + <number>id)
      .pipe(catchError(this.errorHandler));
  }

  GetAllUserProfiles(): Observable<IProfile[]> {
    return this._http
      .get<IProfile[]>(this.baseUrl + 'user_profile/')
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.error || 'Server Error');
  }
}
