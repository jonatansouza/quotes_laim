import { Component, OnInit } from '@angular/core';
import { Author } from '../models/author';
import { AuthorsService } from '../authors.service';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  authors: Author[];
  pageLength: number;
  pageSize = 5;
  loggedin: boolean;
  constructor(private authorsService: AuthorsService, 
              public snackbar: MatSnackBar,
              private authService: AuthService) {
                this.loggedin = authService.isLoggedin();
              }

  fetchListAuthors(skip: number = 0) {
    this.authorsService.fetchAuthors(this.pageSize, skip).subscribe(authors => {
      this.authors = authors;
    })
  }

  ngOnInit() {
    this.fetchListAuthors();
    this.authorsService.countAuthors().subscribe(count => {
      this.pageLength = count['count'];
    })
  }

  pageEventEmit(event) {
    const pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    const skip = pageIndex * this.pageSize;
    this.fetchListAuthors(skip)
  }

  deleteAuthor(author: Author) {
    this.authorsService.deleteAuthor(author.id).subscribe(result => {
      this.authors.splice(this.authors.indexOf(author), 1)
      this.snackbar.open(`Author Deleted`);
    }, err => {
      this.snackbar.open(`Authors: ${err.error.error.details.messages.content[0]}`, 'close')
    })
  }
}
