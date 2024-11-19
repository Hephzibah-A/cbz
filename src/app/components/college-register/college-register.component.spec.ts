import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeRegisterComponent } from './college-register.component';

describe('CollegeRegisterComponent', () => {
  let component: CollegeRegisterComponent;
  let fixture: ComponentFixture<CollegeRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollegeRegisterComponent]
    });
    fixture = TestBed.createComponent(CollegeRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
