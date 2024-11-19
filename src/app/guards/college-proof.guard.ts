import { CanActivateFn } from '@angular/router';

export const collegeProofGuard: CanActivateFn = (route, state) => {
  return true;
};
