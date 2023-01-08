import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickActionsDialogComponent } from './quick-actions-dialog.component';

describe('QuickActionsDialogComponent', () => {
  let component: QuickActionsDialogComponent;
  let fixture: ComponentFixture<QuickActionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickActionsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickActionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
