import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  message = '';

  constructor(private router: Router) {}

  login() {
    const savedUser = localStorage.getItem('user_' + this.username);

    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user.password === this.password) {
        // ✅ save logged in user
        localStorage.setItem('currentUser', this.username);
        this.message = '✅ Login successful!';
        setTimeout(() => this.router.navigate(['/notes']), 1000);
      } else {
        this.message = '⚠️ Invalid password';
      }
    } else {
      this.message = '⚠️ User not found. Please register first.';
      setTimeout(() => this.router.navigate(['/register']), 1200);
    }
  }
}
