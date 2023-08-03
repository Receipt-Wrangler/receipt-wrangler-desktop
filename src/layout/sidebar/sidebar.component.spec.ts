import { SharedUiModule } from 'src/shared-ui/shared-ui.module';
import { AuthState } from '@receipt-wrangler/receipt-wrangler-core';
import { GroupState } from '@receipt-wrangler/receipt-wrangler-core';
import { LayoutState } from 'src/store/layout.state';

import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxsModule } from '@ngxs/store';
import { ApiModule } from '@receipt-wrangler/receipt-wrangler-core';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [
        HttpClientModule,
        NgxsModule.forRoot([AuthState, LayoutState, GroupState]),
        MatSnackBarModule,
        MatSidenavModule,
        SharedUiModule,
        ApiModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
