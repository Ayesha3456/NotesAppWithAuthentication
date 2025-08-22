import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  message: string = '';

  constructor(private router: Router) {}

  onRegister() {
    if (!this.name || !this.email || !this.username || !this.password || !this.confirmPassword) {
      this.message = '⚠️ All fields are required!';
      return;
    }
  
    if (this.password !== this.confirmPassword) {
      this.message = '⚠️ Passwords do not match!';
      return;
    }
  
    const userData = { 
      name: this.name, 
      email: this.email, 
      username: this.username, 
      password: this.password 
    };
    localStorage.setItem('user_' + this.username, JSON.stringify(userData));
  
    this.message = '✅ Registration successful! Redirecting to login...';
  
    setTimeout(() => this.router.navigate(['/login']), 1500); // ✅ auto-redirect
  }
  
}
