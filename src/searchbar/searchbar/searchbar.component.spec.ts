import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { SearchbarComponent } from './searchbar.component';
import { ApiModule, SearchResult, SearchService } from 'src/api';

describe('SearchbarComponent', () => {
  let component: SearchbarComponent;
  let fixture: ComponentFixture<SearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchbarComponent],
      imports: [
        ApiModule,
        HttpClientTestingModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should attempt to navigate to result', () => {
    const spy = spyOn(TestBed.inject(Router), 'navigateByUrl');
    const result: SearchResult = {
      id: 1,
      groupId: 1,
      type: 'Receipt',
      name: 'Hello',
      date: 'totally a date',
    };

    component.navigateToResult(result);
    expect(spy).toHaveBeenCalledWith('/receipts/1/view');
  });

  it('should do nothing when there is an invalid type', () => {
    const spy = spyOn(TestBed.inject(Router), 'navigateByUrl');
    const result: SearchResult = {
      id: 1,
      groupId: 1,
      type: 'Not a valid type',
      name: 'Hello',
      date: 'totally a date',
    };

    component.navigateToResult(result);
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should attempt to call the search service', () => {
    const spy = spyOn(TestBed.inject(SearchService), 'receiptSearch');
    spy.and.returnValue(
      of([
        {
          id: 1,
          groupId: 1,
          type: 'Not a valid type',
          name: 'Hello',
          date: 'totally a date',
        },
      ] as any)
    );

    component.ngOnInit();
    component.searchFormControl.patchValue('new search');

    expect(spy).toHaveBeenCalledWith('new search');
    expect(component.results).toEqual([
      {
        id: 1,
        groupId: 1,
        type: 'Not a valid type',
        name: 'Hello',
        date: 'totally a date',
      },
    ]);
  });
});
