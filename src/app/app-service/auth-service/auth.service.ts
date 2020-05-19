import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../../app-interface/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl : string = 'https://pibeedjango.herokuapp.com/api/';

  constructor(private _http : HttpClient) { }

  GetUser(id) : Observable<any>{
    let returnValue = this._http.get(this.baseUrl + 'users/', id);
    return(returnValue)
  }

  GetAllUserProfiles() : Observable<any>{
    let returnValue = this._http.get(this.baseUrl + 'users_profile/');
    return(returnValue)
  }

  GetAllUsers() : Observable<any>{
    let returnValue = this._http.get(this.baseUrl + 'users/');
    return(returnValue)
  }

  Register(userData) : Observable<any>{
    let returnValue = this._http.post(this.baseUrl + 'register/', userData);
    return(returnValue)
  }

  LogIn(loginData):  Observable <any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Token " + localStorage.getItem('Token')
      })
    };
    let returnValue = this._http.post(this.baseUrl + 'login/', loginData, httpOptions)
    return(returnValue)
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

  editProfile(profileData) : Observable <any>{
    let returnValue = this._http.patch(this.baseUrl + 'profile/', profileData)
    return(returnValue)
  }

  ViewProfile(profileData) : Observable <any>{
    let returnValue = this._http.get(this.baseUrl + 'profile/', profileData)
    return(returnValue)
  }

  EditUserDetails(userData) : Observable<any>{
    let returnValue = this._http.patch(this.baseUrl + 'register/', userData);
    return(returnValue)
  }
  
}
