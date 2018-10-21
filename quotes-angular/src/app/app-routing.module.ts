import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuotesComponent } from './quotes/quotes.component';
import { AuthorsComponent } from './authors/authors.component';
import { CreateQuoteComponent } from './create-quote/create-quote.component';
import { CreateAuthorComponent } from './create-author/create-author.component';
import { EditQuoteComponent } from './edit-quote/edit-quote.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: 'quotes', component: QuotesComponent},
  {path: 'quotes/create', component: CreateQuoteComponent, canActivate: [AuthGuard]},
  {path: 'quotes/:id/edit', component: EditQuoteComponent, canActivate: [AuthGuard]},
  {path: 'authors', component: AuthorsComponent},
  {path: 'authors/create', component: CreateAuthorComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: 'quotes'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
