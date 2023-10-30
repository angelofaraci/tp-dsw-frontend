import { Injectable } from '@angular/core'; 
import { CanActivate, Router } from '@angular/router';
import { AdminAuthService } from './app/services/admin.auth.service';

@Injectable({
  providedIn: 'root'
})

export class AdminAuthGuard implements CanActivate {

  constructor(private authService: AdminAuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }

}
