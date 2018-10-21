import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../models/user';
import { MatSnackBar } from '@angular/material';
import { TOKEN } from '../app.api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(private authService: AuthService,
              private router: Router,
              private snackbar: MatSnackBar) { 
                if(this.authService.isLoggedin()){
                  this.router.navigate(['/quotes'])
                }
              }

  ngOnInit() {
  }
  login(){
    const user = {
      email: this.email,
      password: this.password
    }
    this.authService.login((<User>user)).subscribe(result =>{
      this.snackbar.open(`Login Sucessful`);
      localStorage.setItem(TOKEN, JSON.stringify(result));
      this.router.navigate(['/quotes'])
    }, err => {
       this.snackbar.open(`Login: ${err.error.error.message}`, 'close')
    })
  }
} 
