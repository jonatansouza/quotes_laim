import { Component, OnInit } from '@angular/core';
import { AuthorsService } from '../authors.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Author } from '../models/author';
import { AuthorsComponent } from '../authors/authors.component';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.scss']
})
export class CreateAuthorComponent implements OnInit {
  name: String;
  description: String;
  constructor(private authorsService: AuthorsService,
              public snackbar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
   
  }

  saveAuthor(){
    const author = {
      name: this.name,
      description: this.description
    }
    this.authorsService.saveAuthor((<Author>author)).subscribe(result => {
      this.snackbar.open(`Author Created`);
      this.router.navigate(['/authors'] )
    }, err => {
       this.snackbar.open(`Author: ${err.error.error.details.messages.content[0]}`, 'close')
    })
  }

}
