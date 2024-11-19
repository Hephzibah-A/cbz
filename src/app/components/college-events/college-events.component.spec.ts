import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeEventsComponent } from './college-events.component';

describe('CollegeEventsComponent', () => {
  let component: CollegeEventsComponent;
  let fixture: ComponentFixture<CollegeEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollegeEventsComponent]
    });
    fixture = TestBed.createComponent(CollegeEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
