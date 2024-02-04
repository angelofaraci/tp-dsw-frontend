import { Component } from '@angular/core';
import { AdminAuthService } from '../services/admin.auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-admin-log-in',
  templateUrl: './admin-log-in.component.html',
  styleUrls: ['./admin-log-in.component.scss'],
})
export class AdminLogInComponent {
  constructor(private authService: AdminAuthService, private router: Router) {}

  admin = {
    email: '',
    password: '',
  };

  logIn() {
    this.authService.logIn(this.admin).subscribe(
      (res) => {
        localStorage.setItem('admin_token', res.token);
        this.router.navigate(['/home']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
