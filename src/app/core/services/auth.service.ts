import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {User} from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly USER_KEY = 'currentUser';

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    // Fake check
    if (email && password) {
      const user: User = {
        id: 1,
        email,
        name: 'Talla'
      };
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.USER_KEY);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }
}

