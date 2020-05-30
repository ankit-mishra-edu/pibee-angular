import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IUser } from '../../app-interface/User';
import { IProfile } from 'src/app/app-interface/Profile';
import { IToken } from 'src/app/app-interface/Token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = 'https://pibeedjango.herokuapp.com/api/';

  loggedInUserSubject$ = new BehaviorSubject<IUser>(null);
  loggedInUser: IUser;

  constructor(private _http: HttpClient) {
    if (sessionStorage.length > 0) {
      this.ChangeLoggedInUser$(
        <IUser>JSON.parse(sessionStorage.getItem('userToken')).user
      );
    }
  }

  ChangeLoggedInUser$(loggedInUser: IUser) {
    this.loggedInUserSubject$.next(loggedInUser);
  }

  GetLoggedInUser(): IUser {
    this.loggedInUserSubject$
      .asObservable()
      .subscribe((loggedInUserResponse) => {
        this.loggedInUser = loggedInUserResponse;
      });
    return this.loggedInUser;
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

  Register(userData): Observable<IToken> {
    return this._http
      .post<IToken>(this.baseUrl + 'register/', userData)
      .pipe(catchError(this.errorHandler));
  }

  EditUserDetails(userData): Observable<IToken> {
    return this._http
      .patch<IToken>(this.baseUrl + 'register/', userData)
      .pipe(catchError(this.errorHandler));
  }

  LogIn(loginData): Observable<IToken> {
    return this._http
      .post<IToken>(this.baseUrl + 'login/', loginData)
      .pipe(catchError(this.errorHandler));
  }

  LogOut(): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization:
          'Token ' + JSON.parse(sessionStorage.getItem('userToken')).key,
      }),
    };
    return this._http
      .post<boolean>(this.baseUrl + 'logout/', '', httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  EditProfile(profileData): Observable<IProfile> {
    return this._http
      .patch<IProfile>(this.baseUrl + 'profile/', profileData)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.error || 'Server Error');
  }
}
