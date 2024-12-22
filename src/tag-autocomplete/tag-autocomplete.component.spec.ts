import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagAutocompleteComponent } from './tag-autocomplete.component';

describe('TagAutocompleteComponent', () => {
  let component: TagAutocompleteComponent;
  let fixture: ComponentFixture<TagAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagAutocompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TagAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
