import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuotesService } from '../quotes.service';
import { AuthorsService } from '../authors.service';
import { Quote } from '../models/quote';
import { Author } from '../models/author';
import { QuotesComponent } from '../quotes/quotes.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-quote',
  templateUrl: './edit-quote.component.html',
  styleUrls: ['./edit-quote.component.scss']
})
export class EditQuoteComponent implements OnInit {
  id: string;
  authorId: string;
  content: string;
  authors: Author[];
  constructor(private route: ActivatedRoute,
              private quotesService: QuotesService,
              private router: Router,
              private snackbar: MatSnackBar,
              private authorsService: AuthorsService) {
                this.route.params.subscribe(data => {
                  this.id = data.id;
                })
               }

  ngOnInit() {
    this.quotesService.quoteById(this.id).subscribe(quote => {
      this.content = quote.content;
      this.authorId = quote.authorId;
    })
    this.authorsService.fetchAuthors().subscribe(authors => {
      this.authors = authors;
    })
  }

  updateQuote(){
    const quote = {
      id: this.id,
      content: this.content,
      authorId: this.authorId
    }

    this.quotesService.updateQuote((<Quote>quote)).subscribe(result => {
      this.snackbar.open(`Quote Updated`);
      this.router.navigate([QuotesComponent] )
    }, err => {
       this.snackbar.open(`Quotes: ${err.error.error.details.messages.content[0]}`, 'close')
    })
  }

}
