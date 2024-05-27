import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTableFilterComponent } from './group-table-filter.component';

describe('GroupTableFilterComponent', () => {
  let component: GroupTableFilterComponent;
  let fixture: ComponentFixture<GroupTableFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupTableFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupTableFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
