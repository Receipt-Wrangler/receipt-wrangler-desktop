import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListComponent } from './item-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { PipesModule } from 'src/pipes/pipes.module';
import { FormGroup } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemListComponent],
      imports: [HttpClientTestingModule, PipesModule, NgxsModule.forRoot([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { data: {} } },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
