import { TestBed } from '@angular/core/testing';

import { CollegeUserRegisterService } from './college-user-register.service';

describe('CollegeUserRegisterService', () => {
  let service: CollegeUserRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollegeUserRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
