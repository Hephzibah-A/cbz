import { TestBed } from '@angular/core/testing';

import { CollegeEventsService } from './college-events.service';

describe('CollegeEventsService', () => {
  let service: CollegeEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollegeEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
