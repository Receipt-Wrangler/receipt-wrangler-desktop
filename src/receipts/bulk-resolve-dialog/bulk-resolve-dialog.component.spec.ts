import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkResolveDialogComponent } from './bulk-resolve-dialog.component';

describe('BulkResolveDialogComponent', () => {
  let component: BulkResolveDialogComponent;
  let fixture: ComponentFixture<BulkResolveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkResolveDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkResolveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
