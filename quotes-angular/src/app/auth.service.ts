import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API, TOKEN } from './app.api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  getAccessToken(){
    return JSON.parse(localStorage.getItem(TOKEN)).id
  }

  login(user){
    return this.http.post<any>(`${API}/api/users/login`, user)
  }
  logout(){
    const accessToken = this.getAccessToken();
    return this.http.post<any>(`${API}/api/users/logout?access_token=${accessToken}`, {})
  }

  isLoggedin(){
    return localStorage.getItem(TOKEN) != undefined
  }
}
