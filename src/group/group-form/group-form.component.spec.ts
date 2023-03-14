import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { of } from 'rxjs';
import { ButtonModule } from 'src/button/button.module';
import { GroupRole } from 'src/enums/group-role.enum';
import { InputModule } from 'src/input/input.module';
import { FormGetPipe } from 'src/pipes/form-get.pipe';
import { PipesModule } from 'src/pipes/pipes.module';
import { SelectModule } from 'src/select/select.module';
import { SharedUiModule } from 'src/shared-ui/shared-ui.module';
import { TableModule } from 'src/table/table.module';
import { UserAutocompleteModule } from 'src/user-autocomplete/user-autocomplete.module';
import { GroupMemberFormComponent } from '../group-member-form/group-member-form.component';
import { buildGroupMemberForm } from '../utils/group-member.utils';
import { GroupFormComponent } from './group-form.component';

fdescribe('GroupFormComponent', () => {
  let component: GroupFormComponent;
  let fixture: ComponentFixture<GroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupFormComponent, GroupMemberFormComponent],
      imports: [
        ButtonModule,
        HttpClientTestingModule,
        InputModule,
        MatCardModule,
        MatDialogModule,
        MatSnackBarModule,
        NgxsModule.forRoot([]),
        NoopAnimationsModule,
        PipesModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        SelectModule,
        SharedUiModule,
        TableModule,
        UserAutocompleteModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                group: {},
                formConfig: {},
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupFormComponent);
    component = fixture.componentInstance;
    component.table = {
      sort: new MatSort(),
    } as any;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add user to group member on add', () => {
    const matDialog = TestBed.inject(MatDialog);
    const formGroup = buildGroupMemberForm();
    formGroup.patchValue({
      userId: '2',
      groupId: '1',
      groupRole: GroupRole.VIEWER,
    });
    spyOn(matDialog, 'open').and.returnValue({
      afterClosed: () => of(formGroup),
      componentInstance: { currentGroupMembers: [] },
    } as any);
    component.ngOnInit();
    component.ngAfterViewInit();

    component.addGroupMemberClicked();

    expect(component.groupMembers.value).toEqual([formGroup.value]);
    expect(component.dataSource.data).toEqual([formGroup.value]);
  });

  it('should update form on edit', () => {
    const result = [
      {
        userId: 2,
        groupId: 1,
        groupRole: GroupRole.OWNER,
      },
      {
        userId: 3,
        groupId: 1,
        groupRole: GroupRole.OWNER,
      },
    ];
    const matDialog = TestBed.inject(MatDialog);
    const formGroup = buildGroupMemberForm();
    formGroup.patchValue({
      userId: 3,
      groupId: 1,
      groupRole: GroupRole.OWNER,
    });
    spyOn(matDialog, 'open').and.returnValue({
      afterClosed: () => of(formGroup),
      componentInstance: { currentGroupMembers: [] },
    } as any);
    const route = TestBed.inject(ActivatedRoute);
    route.snapshot.data = {
      group: {
        id: 1,
        name: 'test',
        isDefault: true,
        groupMembers: [
          {
            userId: 2,
            groupId: 1,
            groupRole: GroupRole.OWNER,
          },
          {
            userId: 1,
            groupId: 1,
            groupRole: GroupRole.VIEWER,
          },
        ],
      },
      formConfig: {},
    };

    component.ngOnInit();
    component.ngAfterViewInit();

    component.editGroupMemberClicked(1);

    expect(component.groupMembers.value).toEqual(result);
    expect(component.dataSource.data).toEqual(result as any);
  });

  it('should remove user to group member on remove', () => {
    const route = TestBed.inject(ActivatedRoute);
    const result = {
      userId: 1,
      groupId: 1,
      groupRole: GroupRole.VIEWER,
    };

    route.snapshot.data = {
      group: {
        id: 1,
        name: 'test',
        isDefault: true,
        groupMembers: [
          {
            userId: 2,
            groupId: 1,
            groupRole: GroupRole.OWNER,
          },
          result,
        ],
      },
      formConfig: {},
    };

    component.ngOnInit();
    component.ngAfterViewInit();

    component.removeGroupMember(0);

    expect(component.groupMembers.value).toEqual([result]);
    expect(component.dataSource.data).toEqual([result] as any);
  });
});
