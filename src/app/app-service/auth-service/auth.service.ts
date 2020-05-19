import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../../app-interface/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http : HttpClient) { }

  GetUser(id) : Observable<any>{
    let returnValue = this._http.get('https://pibeedjango.herokuapp.com/api/users/', id);
    return(returnValue)
  }

  GetAllUserProfiles() : Observable<any>{
    let returnValue = this._http.get('https://pibeedjango.herokuapp.com/api/users_profile/');
    return(returnValue)
  }

  GetAllUsers() : Observable<any>{
    let returnValue = this._http.get('https://pibeedjango.herokuapp.com/api/users/');
    return(returnValue)
  }

  Register(userData) : Observable<any>{
    let returnValue = this._http.post('https://pibeedjango.herokuapp.com/api/register/', userData);
    return(returnValue)
  }

  LogIn(loginData):  Observable <any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Token " + localStorage.getItem('Token')
      })
    };
    let returnValue = this._http.post('https://pibeedjango.herokuapp.com/api/login/', loginData, httpOptions)
    return(returnValue)
  }

  LogOut():  Observable <any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Token " + localStorage.getItem('Token')
      })
    };
    let returnValue = this._http.post('https://pibeedjango.herokuapp.com/api/logout/', "", httpOptions)
    return(returnValue)
  }

  editProfile(profileData) : Observable <any>{
    let returnValue = this._http.patch('https://pibeedjango.herokuapp.com/api/profile/', profileData)
    return(returnValue)
  }

  ViewProfile(profileData) : Observable <any>{
    let returnValue = this._http.get('https://pibeedjango.herokuapp.com/api/profile/', profileData)
    return(returnValue)
  }

  EditUserDetails(userData) : Observable<any>{
    let returnValue = this._http.patch('https://pibeedjango.herokuapp.com/api/register/', userData);
    return(returnValue)
  }
  
}
