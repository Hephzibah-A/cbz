import { TestBed } from '@angular/core/testing';

import { CollegeProfileService } from './college-profile.service';

describe('CollegeProfileService', () => {
  let service: CollegeProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollegeProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
