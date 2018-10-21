import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { TOKEN } from './app.api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loggedin: boolean
  constructor(private authService: AuthService,
              private route: Router) {
  }

  routeChange() {
    this.loggedin = this.authService.isLoggedin();
  }
  logout(){
    this.authService.logout().subscribe(result => {
      localStorage.removeItem(TOKEN);
      this.route.navigate(['/login'])
    });
  }
}
