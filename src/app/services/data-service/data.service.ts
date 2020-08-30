import { Injectable } from '@angular/core';
import { IUser } from 'src/app/interfaces/User';
import { IProfile } from 'src/app/interfaces/Profile';
import {
  BehaviorSubject,
  Observable,
  of,
  throwError,
  Subject,
  ReplaySubject,
} from 'rxjs';
import { distinctUntilChanged, catchError, share } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  loggedInUser: IUser;
  baseUrl: string = 'https://pibeedjango.herokuapp.com/api/';

  public searchQueryChangeSubject$ = new Subject<string>();
  private _loggedInUserSubject$ = new BehaviorSubject<IUser>(null);
  public userProfileSubject$ = new BehaviorSubject<IProfile>(null);
  public allUsersSubject$ = new BehaviorSubject<IUser[]>(null);
  public allUsersProfileSubject$ = new BehaviorSubject<IProfile[]>(null);

  loggedInUser$ = this._loggedInUserSubject$
    .asObservable()
    .pipe(
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
      )
    );

  allUsersArray$ = this.allUsersSubject$
    .asObservable()
    .pipe(
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
      )
    );

  userProfile$ = this.userProfileSubject$
    .asObservable()
    .pipe(
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
      )
    );

  allUsersProfile$ = this.allUsersProfileSubject$
    .asObservable()
    .pipe(
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
      )
    );

  constructor(private _http: HttpClient) {
    if (sessionStorage.length > 0) {
      this.ChangeLoggedInUser$(
        <IUser>JSON.parse(sessionStorage.getItem('userToken')).user
      );
    }
  }

  suggestNames(
    allUsersProfile: IProfile[],
    partial: string
  ): Observable<IProfile[]> {
    let usernamesArray: IProfile[] = [];
    console.log(partial);
    allUsersProfile?.forEach((userProfile) => {
      if (
        userProfile.address.user.username
          .toLowerCase()
          .includes(partial.toLowerCase())
      ) {
        usernamesArray.push(userProfile);
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
      .pipe(share(), catchError(this.errorHandler));
  }

  GetUserProfileById(id): Observable<IProfile> {
    return this._http
      .get<IProfile>(this.baseUrl + 'user_profile/' + <number>id)
      .pipe(catchError(this.errorHandler), share());
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
