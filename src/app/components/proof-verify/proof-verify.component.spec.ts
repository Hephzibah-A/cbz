import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofVerifyComponent } from './proof-verify.component';

describe('ProofVerifyComponent', () => {
  let component: ProofVerifyComponent;
  let fixture: ComponentFixture<ProofVerifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProofVerifyComponent]
    });
    fixture = TestBed.createComponent(ProofVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
