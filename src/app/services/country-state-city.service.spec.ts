import { TestBed } from '@angular/core/testing';

import { CountryStateCityService } from './country-state-city.service';

describe('CountryStateCityService', () => {
  let service: CountryStateCityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryStateCityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
