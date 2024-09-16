import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconAutocompleteComponent } from './icon-autocomplete.component';

describe('IconAutocompleteComponent', () => {
  let component: IconAutocompleteComponent;
  let fixture: ComponentFixture<IconAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconAutocompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IconAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
