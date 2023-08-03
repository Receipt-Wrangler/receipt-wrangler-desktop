import { of } from 'rxjs';
import { PipesModule } from 'src/pipes/pipes.module';

import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { ApiModule } from '@receipt-wrangler/receipt-wrangler-core';

import { DashboardRoutingModule } from '../dashboard-routing.module';
import { SummaryCardComponent } from '../../shared-ui/summary-card/summary-card.component';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, SummaryCardComponent],
      imports: [
        ApiModule,
        CommonModule,
        DashboardRoutingModule,
        HttpClientTestingModule,
        MatCardModule,
        MatListModule,
        NgxsModule.forRoot([]),
        PipesModule,
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

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
