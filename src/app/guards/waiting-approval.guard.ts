import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const waitingApprovalGuard: CanActivateFn = (route, state) => {

    const router = inject(Router);
  if (sessionStorage.getItem('isWaitingApproval') == 'true') { 
    return true;
  }
  else {
    router.navigate(['/login']);
    return false;
  }
};
