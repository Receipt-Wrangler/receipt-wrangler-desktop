import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAutocompleteComponent } from './group-autocomplete.component';

describe('GroupAutocompleteComponent', () => {
  let component: GroupAutocompleteComponent;
  let fixture: ComponentFixture<GroupAutocompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupAutocompleteComponent]
    });
    fixture = TestBed.createComponent(GroupAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
