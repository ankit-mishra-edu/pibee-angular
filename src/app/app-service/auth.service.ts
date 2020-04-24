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
    let returnValue = this._http.post('https://amishm766.pythonanywhere.com/api/register/', user);
    return(returnValue)
  }

  LogIn(loginData):  Observable <any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Token " + localStorage.getItem('Token')
      })
    };
    let returnValue = this._http.post('https://amishm766.pythonanywhere.com/api/login/', loginData, httpOptions)
    return(returnValue)
  }

  LogOut():  Observable <any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Token " + localStorage.getItem('Token')
      })
    };
    let returnValue = this._http.post('https://amishm766.pythonanywhere.com/api/logout/', "", httpOptions)
    return(returnValue)
  }
  
}
