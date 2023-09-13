import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSettingsEmailComponent } from './group-settings-email.component';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PipesModule as CorePipesModule } from '@receipt-wrangler/receipt-wrangler-core';
import { PipesModule } from 'src/pipes/pipes.module';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

describe('GroupSettingsEmailComponent', () => {
  let component: GroupSettingsEmailComponent;
  let fixture: ComponentFixture<GroupSettingsEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupSettingsEmailComponent],
      imports: [MatSnackBarModule, PipesModule, CorePipesModule],
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
    fixture = TestBed.createComponent(GroupSettingsEmailComponent);

    component = fixture.componentInstance;
    component.form = new FormGroup({
      emailToRead: new FormControl(''),
      emailWhiteList: new FormArray([]),
      subjectLineRegexes: new FormArray([]),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
