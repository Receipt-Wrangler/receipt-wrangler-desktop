import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredReceiptsComponent } from './filtered-receipts.component';

describe('FilteredReceiptsComponent', () => {
  let component: FilteredReceiptsComponent;
  let fixture: ComponentFixture<FilteredReceiptsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilteredReceiptsComponent]
    });
    fixture = TestBed.createComponent(FilteredReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
