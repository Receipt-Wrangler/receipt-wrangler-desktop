import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickScanButtonComponent } from './quick-scan-button.component';

describe('QuickScanButtonComponent', () => {
  let component: QuickScanButtonComponent;
  let fixture: ComponentFixture<QuickScanButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuickScanButtonComponent]
    });
    fixture = TestBed.createComponent(QuickScanButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
