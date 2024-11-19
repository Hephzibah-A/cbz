import { TestBed } from '@angular/core/testing';

import { CollegeRegisterService } from './college-register.service';

describe('CollegeRegisterService', () => {
  let service: CollegeRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollegeRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
