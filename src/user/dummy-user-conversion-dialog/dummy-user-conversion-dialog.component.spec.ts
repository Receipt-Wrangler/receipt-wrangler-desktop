import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyUserConversionDialogComponent } from './dummy-user-conversion-dialog.component';

describe('DummyUserConversionDialogComponent', () => {
  let component: DummyUserConversionDialogComponent;
  let fixture: ComponentFixture<DummyUserConversionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DummyUserConversionDialogComponent]
    });
    fixture = TestBed.createComponent(DummyUserConversionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
