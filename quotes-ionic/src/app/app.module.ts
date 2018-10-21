import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { QuoteProvider } from '../providers/quote/quote';
import { HttpClientModule } from '@angular/common/http';
import { AuthorProvider } from '../providers/author/author';
import { AuthProvider } from '../providers/auth/auth';

@NgModule({
  declarations: [
    MyApp

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    QuoteProvider,
    AuthorProvider,
    AuthProvider
  ]
})
export class AppModule {}
