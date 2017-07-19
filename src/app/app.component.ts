import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private auth: AuthService) {}

  isGuest(): boolean {
    return !this.auth.loggedIn();
  }

  logout() {
    this.auth.logout('login');
  }
}
