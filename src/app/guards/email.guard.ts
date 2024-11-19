import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const emailGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (sessionStorage.getItem('isEmailVerify') == 'true') {
    // router.navigate(['/waiting-for-approval']);
    return true;
  }

  else {
    router.navigate(['/login']);
    return false;
  }
};
