import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeUserRegisterComponent } from './college-user-register.component';

describe('CollegeUserRegisterComponent', () => {
  let component: CollegeUserRegisterComponent;
  let fixture: ComponentFixture<CollegeUserRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollegeUserRegisterComponent]
    });
    fixture = TestBed.createComponent(CollegeUserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
