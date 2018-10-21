import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from './app.api';
import { Observable } from 'rxjs';
import { Author } from './models/author';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  fetchAuthors(pageSize: number = 5, skip: number = 0): Observable<Author[]> {
    return this.http.get<Author[]>(`${API}/api/Authors/?filter[limit]=${pageSize}&filter[skip]=${skip}`)
  }
  countAuthors(): Observable<any> {
    return this.http.get<any>(`${API}/api/Authors/count`)
  }

  saveAuthor(author: Author) {
    return this.http.post<Author>(`${API}/api/Authors?access_token=${this.authService.getAccessToken()}`, author)
  }
  updateAuthor(Author: Author): Observable<Author>{
    return this.http.put<Author>(`${API}/api/Authors/${Author.id}?access_token=${this.authService.getAccessToken()}`, Author);
  }
  deleteAuthor(id: string): Observable<any>{
    return this.http.delete<any>(`${API}/api/Authors/${id}?access_token=${this.authService.getAccessToken()}`);
  }

}
