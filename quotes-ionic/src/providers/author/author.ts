import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '../../app/models/author';
import { API } from '../../app/app.api';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the AuthorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthorProvider {

  constructor(private http: HttpClient) { }

  fetchAuthors(pageSize: number = 5, skip: number = 0): Observable<Author[]> {
    return this.http.get<Author[]>(`${API}/api/Authors/?filter[limit]=${pageSize}&filter[skip]=${skip}`)
  }
  countAuthors(): Observable<any> {
    return this.http.get<any>(`${API}/api/Authors/count`)
  }

}
