import { BehaviorSubject, of } from 'rxjs';
import { PipesModule } from 'src/pipes/pipes.module';

import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxsModule, Store } from '@ngxs/store';
import {
  ApiModule,
  Dashboard,
  GroupState,
} from '@receipt-wrangler/receipt-wrangler-core';

import { DashboardRoutingModule } from '../dashboard-routing.module';
import { SummaryCardComponent } from '../../shared-ui/summary-card/summary-card.component';
import { DashboardComponent } from './dashboard.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dashboards: Dashboard[];

  beforeEach(async () => {
    dashboards = [
      {
        id: 1,
        userId: 1,
        name: 'Test Dashboard',
        widgets: [],
      } as Dashboard,
      {
        id: 2,
        userId: 1,
        name: 'Test Dashboard 2',
        widgets: [],
      } as Dashboard,
    ];
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, SummaryCardComponent],
      imports: [
        ApiModule,
        CommonModule,
        DashboardRoutingModule,
        HttpClientTestingModule,
        MatCardModule,
        MatDialogModule,
        MatListModule,
        NgxsModule.forRoot([GroupState]),
        PipesModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: new BehaviorSubject<Params>({ id: '1' }),
            parent: {
              snapshot: {
                data: {
                  dashboards: dashboards,
                },
              },
            },
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

  it('should set dashboards', () => {
    component.ngOnInit();
    expect(component.dashboards).toEqual(dashboards);
  });

  it('should set selected dashboard', () => {
    const store = TestBed.inject(Store);
    store.reset({
      groups: {
        selectedDashboardId: '2',
      },
    });
    component.ngOnInit();

    expect(component.selectedDashboard).toEqual(dashboards[1]);
  });
});
