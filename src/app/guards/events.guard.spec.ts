import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { eventsGuard } from './events.guard';

describe('eventsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => eventsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
