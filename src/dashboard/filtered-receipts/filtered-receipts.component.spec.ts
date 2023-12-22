import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredReceiptsComponent } from './filtered-receipts.component';
import { NgxsModule } from '@ngxs/store';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FilteredReceiptsComponent', () => {
  let component: FilteredReceiptsComponent;
  let fixture: ComponentFixture<FilteredReceiptsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilteredReceiptsComponent],
      imports: [NgxsModule.forRoot([]), HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(FilteredReceiptsComponent);
    component = fixture.componentInstance;
    component.widget = {} as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
