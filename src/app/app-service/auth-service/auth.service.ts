import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IUser } from '../../app-interface/User';
import { IProfile } from 'src/app/app-interface/Profile';
import { IToken } from 'src/app/app-interface/Token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl : string = 'https://pibeedjango.herokuapp.com/api/';

  constructor(private _http : HttpClient) { }

  GetUser(id) : Observable<IUser>{
    let returnValue = this._http.get<IUser>(this.baseUrl + 'user/' + <number>id);
    return(returnValue.pipe(catchError(this.errorHandler)));
  }

  GetAllUsers() : Observable<IUser[]>{
    let returnValue = this._http.get<IUser[]>(this.baseUrl + 'user/');
    return(returnValue.pipe(catchError(this.errorHandler)));
  }

  GetUserProfile(id) : Observable<IProfile>{
    let returnValue = this._http.get<IProfile>(this.baseUrl + 'user_profile/' + <number>id);
    return(returnValue.pipe(catchError(this.errorHandler)));
  }

  GetAllUserProfiles() : Observable<IProfile[]>{
    let returnValue = this._http.get<IProfile[]>(this.baseUrl + 'user_profile/');
    return(returnValue.pipe(catchError(this.errorHandler)));
  }

  Register(userData) : Observable<IToken>{
    let returnValue = this._http.post<IToken>(this.baseUrl + 'register/', userData);
    return(returnValue.pipe(catchError(this.errorHandler)));
  }

  EditUserDetails(userData) : Observable<IToken>{
    let returnValue = this._http.patch<IToken>(this.baseUrl + 'register/', userData);
    return(returnValue.pipe(catchError(this.errorHandler)));
  }

  LogIn(loginData):  Observable <IToken>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Token " + localStorage.getItem('Token')
      })
    };
    let returnValue = this._http.post<IToken>(this.baseUrl + 'login/', loginData, httpOptions);
    return(returnValue.pipe(catchError(this.errorHandler)));
  }

  LogOut():  Observable <boolean>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Token " + localStorage.getItem('Token')
      })
    };
    let returnValue = this._http.post<boolean>(this.baseUrl + 'logout/', "", httpOptions)
    return(returnValue.pipe(catchError(this.errorHandler)))
  }

  EditProfile(profileData) : Observable <IProfile>{
    let returnValue = this._http.patch<IProfile>(this.baseUrl + 'profile/', profileData);
    return(returnValue.pipe(catchError(this.errorHandler)));
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.error || "Server Error");
  }
  
}
