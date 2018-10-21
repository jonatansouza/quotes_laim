import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { QuotesComponent } from './quotes/quotes.component';
import { CreateQuoteComponent } from './create-quote/create-quote.component';
import { EditQuoteComponent } from './edit-quote/edit-quote.component';
import { AuthorsComponent } from './authors/authors.component';
import { CreateAuthorComponent } from './create-author/create-author.component';
import { EditAuthorComponent } from './edit-author/edit-author.component';

import {FlexLayoutModule} from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { QuotesService } from './quotes.service';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    QuotesComponent,
    CreateQuoteComponent,
    EditQuoteComponent,
    AuthorsComponent,
    CreateAuthorComponent,
    EditAuthorComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
