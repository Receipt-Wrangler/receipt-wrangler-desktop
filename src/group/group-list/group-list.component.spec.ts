import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupListComponent } from './group-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxsModule } from '@ngxs/store';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { TableModule } from 'src/table/table.module';
import { SharedUiModule } from 'src/shared-ui/shared-ui.module';
import { ButtonModule } from 'src/button/button.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('GroupListComponent', () => {
  let component: GroupListComponent;
  let fixture: ComponentFixture<GroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupListComponent],
      imports: [
        HttpClientTestingModule,
        NgxsModule.forRoot([]),
        MatSnackBarModule,
        MatDialogModule,
        TableModule,
        SharedUiModule,
        ButtonModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
