import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../app/app.api';
import { Events } from 'ionic-angular';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  user
  constructor(private http: HttpClient, private events: Events) {
    this.events.subscribe('user_login', result =>{
      this.user = result;
      console.log('user_login', this.user);
    })
   }
  getAccessToken() {
    return this.user ? this.user.id : undefined;
  }

  login(user) {
    return this.http.post<any>(`${API}/api/users/login`, user)
  }
  logout() {
    this.user = undefined;
  }

  isLoggedin() {
    return this.user != undefined
  }
}
