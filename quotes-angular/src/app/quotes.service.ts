import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from './app.api';
import { Quote } from './models/quote';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  fetchQuotes(pageSize:number = 5, skip: number = 0): Observable<Quote[]>{
    return this.http.get<Quote[]>(`${API}/api/Quotes/?filter[include]=author&filter[limit]=${pageSize}&filter[skip]=${skip}`)
  }
  quoteById(id: string): Observable<Quote>{
    return this.http.get<Quote>(`${API}/api/Quotes/${id}`)
  }
  countQuotes(): Observable<any>{
    return this.http.get<any>(`${API}/api/Quotes/count`)
  }
  saveQuote(quote: Quote): Observable<Quote>{
    return this.http.post<Quote>(`${API}/api/Quotes?access_token=${this.authService.getAccessToken()}`, quote);
  }
  updateQuote(quote: Quote): Observable<Quote>{
    return this.http.put<Quote>(`${API}/api/Quotes/${quote.id}?access_token=${this.authService.getAccessToken()}`, quote);
  }
  deleteQuote(id: string): Observable<any>{
    return this.http.delete<any>(`${API}/api/Quotes/${id}?access_token=${this.authService.getAccessToken()}`);
  }


}
