import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const eventsGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (sessionStorage.getItem('event') == 'true') { 
    return true;
  }
  else {
    return false;
  }


};
