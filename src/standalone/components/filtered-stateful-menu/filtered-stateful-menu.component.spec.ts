import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredStatefulMenuComponent } from './filtered-stateful-menu.component';

describe('FilteredStatefulMenuComponent', () => {
  let component: FilteredStatefulMenuComponent;
  let fixture: ComponentFixture<FilteredStatefulMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilteredStatefulMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilteredStatefulMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
