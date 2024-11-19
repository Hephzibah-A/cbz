import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { proofGuard } from './proof.guard';

describe('proofGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => proofGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
