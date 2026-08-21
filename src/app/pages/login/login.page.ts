import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  templateUrl: './login.page.html'
})
export class LoginPage {

  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  username = 'admin';
  password = 'admin';
  error = '';

  login(): void {
    const loggedIn = this.auth.login(this.username, this.password);

    if (!loggedIn) {
      this.error = 'Please enter username and password.';
      return;
    }

    this.router.navigateByUrl('/app/dashboard');
  }
}
