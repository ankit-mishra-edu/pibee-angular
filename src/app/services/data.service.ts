import { Injectable } from '@angular/core';
import { Subject, throwError, Observable, BehaviorSubject } from 'rxjs';
import {
  tap,
  share,
  catchError,
  shareReplay,
  distinctUntilChanged,
} from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// All Interfaces
import { IUser } from '../modules/shared/interfaces/User';
import { IProfile } from '../modules/shared/interfaces/Profile';
import { IMessage } from '../modules/shared/interfaces/Message';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  loggedInUser: IUser;
  baseUrl: string = 'https://pibeedjango.herokuapp.com/api/';

  public messageSubject$ = new BehaviorSubject<IMessage[]>(null);

  // Subject for Search Box
  private _searchBoxQuerySubject$ = new Subject<string>();
  private _searchBoxQuery$ = this._searchBoxQuerySubject$
    .asObservable()
    .pipe(
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
      )
    );

  getSearchBoxQuery$(): Observable<string> {
    return this._searchBoxQuery$;
  }
  setSearchBoxQuery$(value: string) {
    this._searchBoxQuerySubject$.next(value);
  }

  // Subject for Logged In User
  private _loggedInUserSubject$ = new BehaviorSubject<IUser>(null);
  private _loggedInUser$ = this._loggedInUserSubject$
    .asObservable()
    .pipe(
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
      )
    );

  getLoggedInUser$(): Observable<IUser> {
    return this._loggedInUser$;
  }
  setLoggedInUser$(value: IUser) {
    this._loggedInUserSubject$.next(value);
  }

  // Subject for All Users
  private _allUsersSubject$ = new BehaviorSubject<IUser[]>(null);
  private _allUsers$ = this._allUsersSubject$
    .asObservable()
    .pipe(
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
      )
    );

  getAllUsers$(): Observable<IUser[]> {
    return this._allUsers$;
  }
  setAllUsers$(value: IUser[]) {
    this._allUsersSubject$.next(value);
  }

  //  Subject for User Profile
  private _userProfileSubject$ = new BehaviorSubject<IProfile>(null);
  private _userProfile$ = this._userProfileSubject$
    .asObservable()
    .pipe(
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
      )
    );

  getUserProfile$(): Observable<IProfile> {
    return this._userProfile$;
  }
  setUserProfile$(value: IProfile) {
    this._userProfileSubject$.next(value);
  }

  //  Subject for All User's Profile
  private _allUsersProfileSubject$ = new BehaviorSubject<IProfile[]>(null);
  private _allUsersProfile$ = this._allUsersProfileSubject$
    .asObservable()
    .pipe(
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
      )
    );

  getAllUserProfile$(): Observable<IProfile[]> {
    return this._allUsersProfile$;
  }
  setAllUserProfile$(value: IProfile[]) {
    this._allUsersProfileSubject$.next(value);
  }

  message$ = this.messageSubject$
    .asObservable()
    .pipe(
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
      )
    );

  constructor(private _http: HttpClient) {
    if (sessionStorage.length > 0) {
      this.setLoggedInUser$(
        <IUser>JSON.parse(sessionStorage.getItem('userToken')).user
      );
    }
  }

  ProcessKeywords(keyword = null, data = null, processingMethod = null) {
    return processingMethod(keyword, data);
  }

  GetUserById(id): Observable<IUser> {
    return this._http
      .get<IUser>(this.baseUrl + 'user/' + <number>id)
      .pipe(catchError(this.errorHandler));
  }

  GetUserProfileById(id): Observable<IProfile> {
    return this._http
      .get<IProfile>(this.baseUrl + 'user_profile/' + <number>id)
      .pipe(catchError(this.errorHandler), share());
  }

  allUsers$: Observable<IUser[]> = this._http
    .get<IUser[]>(this.baseUrl + 'user/')
    .pipe(tap(console.log), shareReplay(), catchError(this.errorHandler));

  allUserProfiles$: Observable<IProfile[]> = this._http
    .get<IProfile[]>(this.baseUrl + 'user_profile/')
    .pipe(tap(console.log), shareReplay(), catchError(this.errorHandler));

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.error || 'Server Error');
  }
}
