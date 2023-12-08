import {
  ComponentFixture,
  ComponentFixtureNoNgZone,
  TestBed,
} from '@angular/core/testing';

import { GroupDashboardsComponent } from './group-dashboards.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxsModule, Store } from '@ngxs/store';
import { MatDialogModule } from '@angular/material/dialog';
import {
  ButtonModule,
  PipesModule as CorePipesModule,
  Dashboard,
  DashboardService,
  GroupState,
  SetSelectedDashboardId,
} from '@receipt-wrangler/receipt-wrangler-core';
import { PipesModule } from 'src/pipes/pipes.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { DashboardState } from 'src/store/dashboard.state';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GroupDashboardsComponent', () => {
  let component: GroupDashboardsComponent;
  let fixture: ComponentFixture<GroupDashboardsComponent>;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupDashboardsComponent],
      imports: [
        CorePipesModule,
        MatDialogModule,
        NgxsModule.forRoot([GroupState, DashboardState]),
        PipesModule,
        ButtonModule,
        HttpClientTestingModule,
      ],
      providers: [
        DashboardService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: new BehaviorSubject<Params>({}),
            snapshot: {
              data: {
                dashboards: [],
              },
            },
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    store = TestBed.inject(Store);
    store.reset({
      groups: {
        selectedGroupId: '1',
      },
    });
    fixture = TestBed.createComponent(GroupDashboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set dashboards with dashboards', () => {
    const dashboards: Dashboard[] = [
      {
        id: 1,
        name: 'test',
        groupId: 1,
        userId: 1,
      },
    ];
    store.reset({
      groups: {
        selectedGroupId: '1',
      },
      dashboards: {
        dashboards: {
          '1': dashboards,
        },
      },
    });

    component.ngOnInit();

    expect(component.dashboards).toEqual(dashboards);
  });

  it('should set dashboards with dashboards on param change', () => {
    const dashboards: Dashboard[] = [
      {
        id: 1,
        name: 'test',
        groupId: 1,
        userId: 1,
      },
    ];
    const newDashboards: Dashboard[] = [
      {
        id: 2,
        name: 'test',
        groupId: 1,
        userId: 1,
      },
    ];
    const activatedRoute = TestBed.inject(ActivatedRoute);
    store.reset({
      groups: {
        selectedGroupId: '1',
      },
      dashboards: {
        dashboards: {
          '1': dashboards,
        },
      },
    });
    component.ngOnInit();

    expect(component.dashboards).toEqual(dashboards);

    store.reset({
      groups: {
        selectedGroupId: '1',
      },
      dashboards: {
        dashboards: {
          '1': newDashboards,
        },
      },
    });

    (activatedRoute.params as any).next({
      dashboardId: 2,
    });

    expect(component.dashboards).toEqual(newDashboards);
  });

  it('should navigate to selected dashboard', () => {
    const routerSpy = spyOn(TestBed.inject(Router), 'navigateByUrl');
    store.reset({
      groups: {
        selectedDashboardId: '1',
      },
    });

    component.ngOnInit();

    expect(routerSpy).toHaveBeenCalledWith('/dashboard/group/1/1', {
      skipLocationChange: false,
      onSameUrlNavigation: 'reload',
    });
  });

  it('should not navigate to selected dashboard', () => {
    const routerSpy = spyOn(TestBed.inject(Router), 'navigateByUrl');
    store.reset({
      groups: {
        selectedDashboardId: undefined,
      },
    });

    component.ngOnInit();

    expect(routerSpy).toHaveBeenCalledTimes(0);
  });

  it('should set selected dashboard id', () => {
    const store = TestBed.inject(Store);
    const storeSpy = spyOn(store, 'dispatch');

    component.setSelectedDashboardId(1);

    expect(storeSpy).toHaveBeenCalledWith(new SetSelectedDashboardId('1'));
  });
});
