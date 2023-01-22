import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAutocompleteComponent } from './user-autocomplete.component';

describe('UserAutocompleteComponent', () => {
  let component: UserAutocompleteComponent;
  let fixture: ComponentFixture<UserAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAutocompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
