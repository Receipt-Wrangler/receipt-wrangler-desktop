import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListComponent } from './item-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { PipesModule } from 'src/pipes/pipes.module';
import { FormGroup } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ItemListComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [PipesModule, NgxsModule.forRoot([])],
    providers: [
        {
            provide: ActivatedRoute,
            useValue: { snapshot: { data: {} } },
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
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
