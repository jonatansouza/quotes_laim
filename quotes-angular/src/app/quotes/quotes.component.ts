import { Component, OnInit } from '@angular/core';
import { QuotesService } from '../quotes.service';
import { Quote } from '../models/quote';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {
  quotes: Quote[];
  pageLength: number;
  pageSize = 5;
  loggedin: boolean;
  constructor(private quotesService: QuotesService,
    private authService: AuthService,
    public snackbar: MatSnackBar) {
      this.loggedin = this.authService.isLoggedin();
  }

  fetchListQuotes(skip: number = 0) {
    this.quotesService.fetchQuotes(this.pageSize, skip).subscribe(quotes => {
      this.quotes = quotes;
    })
  }

  ngOnInit() {
    this.fetchListQuotes();
    this.quotesService.countQuotes().subscribe(count => {
      this.pageLength = count['count'];
    })
  }

  pageEventEmit(event) {
    const pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    const skip = pageIndex * this.pageSize;
    this.fetchListQuotes(skip)
  }

  deleteQuote(quote: Quote) {
    this.quotesService.deleteQuote(quote.id).subscribe(result => {
      this.quotes.splice(this.quotes.indexOf(quote), 1)
      this.snackbar.open(`Quote Deleted`);
    }, err => {
      this.snackbar.open(`Quotes: ${err.error.error.details.messages.content[0]}`, 'close')
    })
  }

} 
