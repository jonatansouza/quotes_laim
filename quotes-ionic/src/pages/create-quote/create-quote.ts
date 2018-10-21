import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Author } from '../../app/models/author';
import { QuoteProvider } from '../../providers/quote/quote';
import { AuthorProvider } from '../../providers/author/author';
import { Quote } from '../../app/models/quote';

/**
 * Generated class for the CreateQuotePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-quote',
  templateUrl: 'create-quote.html',
})
export class CreateQuotePage {
  content;
  authorId;
  authors: Author[]
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private toastCtrl: ToastController,
              private quoteProvider: QuoteProvider,
              private authorProvider: AuthorProvider) {
                this.authorProvider.fetchAuthors().subscribe(results => {
                  this.authors = results;
                })
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateQuotePage');
  }

  saveQuote(){
    const quote = {
      content: this.content,
      authorId: this.authorId
    }
    this.quoteProvider.saveQuote((<Quote> quote))
      .subscribe(result => {
        this.toastCtrl.create({
          message: 'Quote Saved!',
          duration: 3000
        }).present();
        this.navCtrl.setRoot('QuotesPage');
      }, err => {
        const errorMessage = err.error.error.details ? err.error.error.details.messages.content[0] : 'Unauthorized! :\'('; 
        this.toastCtrl.create({
          message: errorMessage,
          duration: 3000
        }).present();
      })
  }

}
