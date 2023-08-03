import { of } from 'rxjs';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import {
  ApiModule,
  UserService,
} from '@receipt-wrangler/receipt-wrangler-core';

import { SummaryCardComponent } from './summary-card.component';

describe('SummaryCardComponent', () => {
  let component: SummaryCardComponent;
  let fixture: ComponentFixture<SummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SummaryCardComponent],
      imports: [
        ApiModule,
        HttpClientTestingModule,
        MatCardModule,
        MatListModule,
        NgxsModule.forRoot([]),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set user data correctly when there is data', () => {
    const usersService = TestBed.inject(UserService);
    spyOn(usersService, 'getAmountOwedForUser').and.returnValue(
      of({
        '1': 200,
        '2': -500,
      } as any)
    );

    component.ngOnChanges({
      groupId: {
        currentValue: '1',
        firstChange: true,
        isFirstChange: () => true,
        previousValue: null,
      },
    });

    expect(Array.from(component.userOwesMap.entries())).toEqual([['1', '200']]);
    expect(Array.from(component.usersOweMap.entries())).toEqual([['2', '500']]);
  });
});
