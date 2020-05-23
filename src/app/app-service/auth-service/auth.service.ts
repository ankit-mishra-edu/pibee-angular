import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../../app-interface/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl : string = 'http://localhost:8000/api/';

  constructor(private _http : HttpClient) { }

  GetUser(id) : Observable<any>{
    let returnValue = this._http.get(this.baseUrl + 'users/', id);
    return(returnValue.pipe(catchError(this.errorHandler)));
  }

  GetAllUserProfiles() : Observable<any>{
    let returnValue = this._http.get(this.baseUrl + 'users_profile/');
    return(returnValue.pipe(catchError(this.errorHandler)));
  }

  GetAllUsers() : Observable<any>{
    let returnValue = this._http.get(this.baseUrl + 'users/');
    return(returnValue.pipe(catchError(this.errorHandler)));
  }

  Register(userData) : Observable<any>{
    let returnValue = this._http.post(this.baseUrl + 'register/', userData);
    return(returnValue.pipe(catchError(this.errorHandler)));
  }

  EditUserDetails(userData) : Observable<any>{
    let returnValue = this._http.patch(this.baseUrl + 'register/', userData);
    return(returnValue.pipe(catchError(this.errorHandler)));
  }

  LogIn(loginData):  Observable <any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Token " + localStorage.getItem('Token')
      })
    };
    let returnValue = this._http.post(this.baseUrl + 'login/', loginData, httpOptions);
    return(returnValue.pipe(catchError(this.errorHandler)));
  }

  LogOut():  Observable <any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Token " + localStorage.getItem('Token')
      })
    };
    let returnValue = this._http.post(this.baseUrl + 'logout/', "", httpOptions)
    return(returnValue)
  }

  EditProfile(profileData) : Observable <any>{
    let returnValue = this._http.patch(this.baseUrl + 'profile/', profileData);
    return(returnValue.pipe(catchError(this.errorHandler)));
  }

  ViewProfile(profileData) : Observable <any>{
    let returnValue = this._http.get(this.baseUrl + 'profile/', profileData);
    return(returnValue.pipe(catchError(this.errorHandler)));
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.error || "Server Error");
  }
  
}
