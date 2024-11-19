import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const idGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (sessionStorage.getItem('isProofVerify') == 'true') {
    // router.navigate(['dashboard']);
    return true;
  }
  // else if (sessionStorage.getItem('isProofVerify') == 'true') {
  //   router.navigate(['proofVerify']);
  //   return false;
  // }
  else { 
    router.navigate(['/']);
    return false;
  }
};
