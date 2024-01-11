import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminAuthService } from './app/services/admin.auth.service';

export const AdminAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AdminAuthService);

  const router = inject(Router);

  if (authService.loggedIn()) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
