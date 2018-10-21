import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController } from 'ionic-angular';
import { QuoteProvider } from '../../providers/quote/quote';
import { Quote } from '../../app/models/quote';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the QuotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage {
  quotes: Quote[]
  pageSize = 10;
  skip = 0;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private authProvider: AuthProvider,
    private actionSheetCtrl: ActionSheetController,
    private quoteProvider: QuoteProvider) {
    this.quoteProvider.fetchQuotes(this.pageSize, this.skip).subscribe(results => {
      this.quotes = results;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuotesPage');
  }

  createQuote() {
    this.navCtrl.push('CreateQuotePage')
  }

  doInfinite(event) {
    this.skip += this.pageSize;
    this.quoteProvider.fetchQuotes(this.pageSize, this.skip).subscribe(results => {
      if(results.length){
        this.quotes = this.quotes.concat(results);
      }
      event.complete();
    })

  }

  showActionSheet(quote: Quote, index: number){
    if(this.authProvider.isLoggedin()){
      this.actionSheetCtrl.create({
        title: 'Modify Quote',
        buttons: [
          {
            text: 'Edit',
            handler: () => {
              this.navCtrl.push('EditQuotePage', {quote: quote});
            }
          },
          {
            text: 'Delete',
            role: 'destructive',
            handler: () => {
              this.deleteQuote(quote.id, index);
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('cancel')
            }
          }
        ]
      }).present();
    }
  }
  deleteQuote(quoteId: string, index: number){
    this.quoteProvider.deleteQuote(quoteId)
      .subscribe(result => {
        this.quotes.splice(index, 1)
        this.toastCtrl.create({
          message: 'Quote Deleted',
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
  checkLogin(){
    return this.authProvider.isLoggedin();
  }
}
