import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Quote } from '../../app/models/quote';
import { Author } from '../../app/models/author';
import { AuthorProvider } from '../../providers/author/author';
import { QuoteProvider } from '../../providers/quote/quote';

/**
 * Generated class for the EditQuotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-quote',
  templateUrl: 'edit-quote.html',
})
export class EditQuotePage {
  quote: Quote;
  content;
  authorId;
  authors: Author[];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private authorProvider: AuthorProvider,
    private quoteProvider: QuoteProvider,
    private toastCtrl: ToastController
  ) {
    this.quote = this.navParams.get('quote');
    this.authorProvider.fetchAuthors().subscribe(results => {
      this.authors = results;
    })
    if (this.quote) {
      this.content = this.quote.content;
      this.authorId = this.quote.authorId || '';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditQuotePage');
  }

  updateQuote() {
    this.quote.content = this.content;
    this.quote.authorId = this.authorId;
    this.quoteProvider.updateQuote(this.quote)
      .subscribe(result => {
        this.toastCtrl.create({
          message: 'Quote Updated!',
          duration: 3000
        }).present();
        this.navCtrl.setRoot('QuotesPage');
      }, err => {
        const errorMessage = err.error.error.details ? err.error.error.details.content[0] : 'Unauthorized! :\'(';
        this.toastCtrl.create({
          message: errorMessage,
          duration: 3000
        }).present();
      })

  }

}
