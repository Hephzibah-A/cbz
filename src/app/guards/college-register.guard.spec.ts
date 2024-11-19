import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { collegeRegisterGuard } from './college-register.guard';

describe('collegeRegisterGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => collegeRegisterGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
