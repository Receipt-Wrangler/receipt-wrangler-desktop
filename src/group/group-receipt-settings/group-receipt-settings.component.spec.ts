import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupReceiptSettingsComponent } from './group-receipt-settings.component';

describe('GroupReceiptSettingsComponent', () => {
  let component: GroupReceiptSettingsComponent;
  let fixture: ComponentFixture<GroupReceiptSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupReceiptSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupReceiptSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
