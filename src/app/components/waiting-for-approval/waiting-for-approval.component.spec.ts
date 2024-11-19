import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingForApprovalComponent } from './waiting-for-approval.component';

describe('WaitingForApprovalComponent', () => {
  let component: WaitingForApprovalComponent;
  let fixture: ComponentFixture<WaitingForApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaitingForApprovalComponent]
    });
    fixture = TestBed.createComponent(WaitingForApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
