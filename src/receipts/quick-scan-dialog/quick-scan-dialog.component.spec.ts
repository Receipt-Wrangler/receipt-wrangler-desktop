import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickScanDialogComponent } from './quick-scan-dialog.component';

describe('QuickScanDialogComponent', () => {
  let component: QuickScanDialogComponent;
  let fixture: ComponentFixture<QuickScanDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuickScanDialogComponent]
    });
    fixture = TestBed.createComponent(QuickScanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
