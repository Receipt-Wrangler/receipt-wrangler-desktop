import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchGroupDialogComponent } from './switch-group-dialog.component';

describe('SwitchGroupDialogComponent', () => {
  let component: SwitchGroupDialogComponent;
  let fixture: ComponentFixture<SwitchGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchGroupDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
