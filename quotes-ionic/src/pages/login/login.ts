import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email;
  password;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private toastCtrl: ToastController,
              private authProvider: AuthProvider,
              private events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(){
    const user = {
      email: this.email,
      password: this.password
    }
    this.authProvider.login(user).subscribe(result => {
      this.events.publish('user_login', result);
      this.navCtrl.setRoot('QuotesPage');
    }, (err) => {
      this.toastCtrl.create({
        message: 'Unauthorized! :\'(',
        duration: 3000
      }).present();
    })
  }
}
