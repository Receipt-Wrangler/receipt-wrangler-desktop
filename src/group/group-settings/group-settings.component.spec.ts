import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSettingsComponent } from './group-settings.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ApiModule } from '@receipt-wrangler/receipt-wrangler-core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxsModule } from '@ngxs/store';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('GroupSettingsComponent', () => {
  let component: GroupSettingsComponent;
  let fixture: ComponentFixture<GroupSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupSettingsComponent],
      imports: [
        ApiModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([]),
        MatSnackBarModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                formConfig: {},
              },
            },
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(GroupSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
