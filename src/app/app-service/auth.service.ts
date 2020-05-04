import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../app-interface/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http : HttpClient) { }

  Register(user) : Observable<any>{
    let returnValue = this._http.post('http://127.0.0.1:8000/api/register/', user);
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

  saveProfile(profileData) : Observable <any>{
    let returnValue = this._http.post('http://127.0.0.1:8000/api/profile/', profileData)
    return(returnValue)
  }
  
}
