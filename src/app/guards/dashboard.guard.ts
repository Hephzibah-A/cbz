import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const dashboardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (sessionStorage.getItem('dashboard') == 'true') {
    // router.navigate(['dashboard']);
    return true;
  }
  // else if (sessionStorage.getItem('isIdVerify') == 'true') { 
  //   router.navigate(['idProof']);
  //   return false;
  // }
  else { 
    router.navigate(['/'])
    return false;
  }
};
