import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (sessionStorage.getItem('isLogin') == 'true') {
    router.navigate(['emailVerify']);
    return true;
  }
 
  else { 
    router.navigate(['/']);
    return false;
  }
};
