import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly storageKey = 'single-page-order-auth';

  readonly isAuthenticated = signal(this.hasStoredSession());

  login(username: string, password: string): boolean {
    const hasCredentials =
      username.trim().length > 0 &&
      password.trim().length > 0;

    if (!hasCredentials) {
      return false;
    }

    localStorage.setItem(
      this.storageKey,
      JSON.stringify({
        username: username.trim(),
        loggedInAt: new Date().toISOString()
      })
    );

    this.isAuthenticated.set(true);

    return true;
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.isAuthenticated.set(false);
  }

  private hasStoredSession(): boolean {
    return Boolean(localStorage.getItem(this.storageKey));
  }
}
