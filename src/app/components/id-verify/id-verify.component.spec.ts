import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdVerifyComponent } from './id-verify.component';

describe('IdVerifyComponent', () => {
  let component: IdVerifyComponent;
  let fixture: ComponentFixture<IdVerifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdVerifyComponent]
    });
    fixture = TestBed.createComponent(IdVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
