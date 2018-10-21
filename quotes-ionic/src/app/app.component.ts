import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'QuotesPage';

  pages: Array<{title: string, page: any}>;

  constructor(public platform: Platform, 
              private authProvider: AuthProvider,
               public statusBar: StatusBar, 
                public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {
        title: 'Quotes', page: 'QuotesPage'
      }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.page);
  }
  login(){
    this.nav.setRoot('LoginPage')
  }
  logout(){
    this.authProvider.logout();
    this.nav.setRoot('QuotesPage');
  }
  checkLogin(){
    return this.authProvider.isLoggedin();
  }
}
