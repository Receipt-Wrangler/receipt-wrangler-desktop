import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from 'src/store/auth.state';
import { LayoutState } from 'src/store/layout.state';
import { GroupState } from 'src/store/group.state';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedUiModule } from 'src/shared-ui/shared-ui.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ApiModule } from 'src/api-new';

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
