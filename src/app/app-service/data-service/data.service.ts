import { Injectable } from '@angular/core';
import { IUser } from 'src/app/app-interface/User';
import { IProfile } from 'src/app/app-interface/Profile';
import { BehaviorSubject, Observable, of, throwError, Subject } from 'rxjs';
import { distinctUntilChanged, catchError, delay } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  loggedInUser: IUser;
  baseUrl: string = 'https:/pibeedjango.herokuapp.com/api/';

  public searchQueryChangeSubject$ = new Subject<string>();
  private _loggedInUserSubject$ = new BehaviorSubject<IUser>(null);
  public userProfileSubject$ = new BehaviorSubject<IProfile>(null);
  public allUsersSubject$ = new BehaviorSubject<IUser[]>(null);
  public allUsersProfileSubject$ = new BehaviorSubject<IProfile[]>(null);

  loggedInUser$ = this._loggedInUserSubject$
    .asObservable()
    .pipe(distinctUntilChanged());

  allUsersArray$ = this.allUsersSubject$
    .asObservable()
    .pipe(distinctUntilChanged());

  userProfile$ = this.userProfileSubject$
    .asObservable()
    .pipe(distinctUntilChanged());

  allUsersProfile$ = this.allUsersProfileSubject$
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor(private _http: HttpClient) {
    if (sessionStorage.length > 0) {
      this.ChangeLoggedInUser$(
        <IUser>JSON.parse(sessionStorage.getItem('userToken')).user
      );
    }
  }

  suggestNames(allUsersArray: IUser[], partial: string): Observable<IUser[]> {
    let usernamesArray: IUser[] = [];
    allUsersArray.forEach((user) => {
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

  GetUserById(id): Observable<IUser> {
    return this._http
      .get<IUser>(this.baseUrl + 'user/' + <number>id)
      .pipe(catchError(this.errorHandler));
  }

  GetAllUsers(): Observable<IUser[]> {
    return this._http
      .get<IUser[]>(this.baseUrl + 'user/')
      .pipe(catchError(this.errorHandler));
  }

  GetUserProfileById(id): Observable<IProfile> {
    return this._http
      .get<IProfile>(this.baseUrl + 'user_profile/' + <number>id)
      .pipe(catchError(this.errorHandler));
  }

  GetAllUsersProfiles(): Observable<IProfile[]> {
    return this._http
      .get<IProfile[]>(this.baseUrl + 'user_profile/')
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.error || 'Server Error');
  }
}
