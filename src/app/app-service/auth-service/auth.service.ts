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
    let returnValue = this._http.get('http://127.0.0.1:8000/api/users/', id);
    return(returnValue)
  }

  GetAllUserProfiles() : Observable<any>{
    let returnValue = this._http.get('http://127.0.0.1:8000/api/users_profile/');
    return(returnValue)
  }

  GetAllUsers() : Observable<any>{
    let returnValue = this._http.get('http://127.0.0.1:8000/api/users/');
    return(returnValue)
  }

  Register(userData) : Observable<any>{
    let returnValue = this._http.post('http://127.0.0.1:8000/api/register/', userData);
    return(returnValue)
  }

  LogIn(loginData):  Observable <any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Token " + localStorage.getItem('Token')
      })
    };
    let returnValue = this._http.post('http://127.0.0.1:8000/api/login/', loginData, httpOptions)
    return(returnValue)
  }

  LogOut():  Observable <any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Token " + localStorage.getItem('Token')
      })
    };
    let returnValue = this._http.post('http://127.0.0.1:8000/api/logout/', "", httpOptions)
    return(returnValue)
  }

  editProfile(profileData) : Observable <any>{
    let returnValue = this._http.put('http://127.0.0.1:8000/api/profile/', profileData)
    return(returnValue)
  }

  ViewProfile(profileData) : Observable <any>{
    let returnValue = this._http.get('http://127.0.0.1:8000/api/profile/', profileData)
    return(returnValue)
  }

  EditUserDetails(userData) : Observable<any>{
    let returnValue = this._http.patch('http://127.0.0.1:8000/api/register/', userData);
    return(returnValue)
  }
  
}
