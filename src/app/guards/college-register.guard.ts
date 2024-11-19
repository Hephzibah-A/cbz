import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const collegeRegisterGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  

  if (sessionStorage.getItem('isEmailVerify') == 'true') {
    
    return true;
  }
  // else if (sessionStorage.getItem('isEmailVerify') == 'true') {
  //   router.navigate(['emailVerify']);
  //   return false;
  // }
  else { 
    router.navigate(['emailVerify']);
    return false;
  }
};



