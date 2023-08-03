import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelButtonComponent } from './cancel-button.component';
import { ButtonModule } from '@receipt-wrangler/receipt-wrangler-core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

describe('CancelButtonComponent', () => {
  let component: CancelButtonComponent;
  let fixture: ComponentFixture<CancelButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CancelButtonComponent],
      imports: [ButtonModule],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CancelButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
