import { Component, OnInit } from '@angular/core';
import { QuotesService } from '../quotes.service';
import { AuthorsService } from '../authors.service';
import { Author } from '../models/author';
import { Quote } from '../models/quote';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { QuotesComponent } from '../quotes/quotes.component';

@Component({
  selector: 'app-create-quote',
  templateUrl: './create-quote.component.html',
  styleUrls: ['./create-quote.component.scss']
})
export class CreateQuoteComponent implements OnInit {
  content: String;
  authorId: String;
  authors: Author[]
  constructor(private quotesService: QuotesService,
              private authorsService: AuthorsService,
              public snackbar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    this.authorsService.fetchAuthors().subscribe(authors => {
      this.authors = authors
    })
  }

  saveQuote(){
    const quote = {
      content: this.content,
      authorId: this.authorId
    }
    this.quotesService.saveQuote((<Quote>quote)).subscribe(result => {
      this.snackbar.open(`Quote Created`);
      this.router.navigate([QuotesComponent] )
    }, err => {
       this.snackbar.open(`Quotes: ${err.error.error.details.messages.content[0]}`, 'close')
    })
  }
}
