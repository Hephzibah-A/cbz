import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { waitingApprovalGuard } from './waiting-approval.guard';

describe('waitingApprovalGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => waitingApprovalGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
