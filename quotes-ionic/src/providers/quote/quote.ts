import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { API } from '../../app/app.api';
import { Quote } from '../../app/models/quote';
import { AuthProvider } from '../auth/auth';

/*
  Generated class for the QuoteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuoteProvider {

  constructor(public http: HttpClient, private authService: AuthProvider) {
    console.log('Hello QuoteProvider Provider');
  }
  fetchQuotes(pageSize: number = 5, skip: number = 0): Observable<Quote[]> {
    return this.http.get<Quote[]>(`${API}/api/Quotes/?filter[include]=author&filter[limit]=${pageSize}&filter[skip]=${skip}`)
  }
  quoteById(id: string): Observable<Quote> {
    return this.http.get<Quote>(`${API}/api/Quotes/${id}`)
  }
  countQuotes(): Observable<any> {
    return this.http.get<any>(`${API}/api/Quotes/count`)
  }
  saveQuote(quote: Quote): Observable<Quote> {
    return this.http.post<Quote>(`${API}/api/Quotes?access_token=${this.authService.getAccessToken()}`, quote);
  }
  updateQuote(quote: Quote): Observable<Quote> {
   return this.http.put<Quote>(`${API}/api/Quotes/${quote.id}?access_token=${this.authService.getAccessToken()}`, quote);
  }
  deleteQuote(id: string): Observable<any>{
   return this.http.delete<any>(`${API}/api/Quotes/${id}?access_token=${this.authService.getAccessToken()}`);
  }

}
