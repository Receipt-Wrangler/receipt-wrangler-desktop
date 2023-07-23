import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditButtonComponent } from './edit-button.component';
import { ButtonModule } from '@noah231515/receipt-wrangler-core';
import { ActivatedRoute } from '@angular/router';

describe('EditButtonComponent', () => {
  let component: EditButtonComponent;
  let fixture: ComponentFixture<EditButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditButtonComponent],
      imports: [ButtonModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
