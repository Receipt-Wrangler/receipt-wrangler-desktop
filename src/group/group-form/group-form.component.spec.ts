import { of } from "rxjs";
import { ApiModule, Group, GroupsService } from "src/api";
import { ButtonModule } from "src/button/button.module";
import { FormMode } from "src/enums/form-mode.enum";
import { GroupRole } from "src/enums/group-role.enum";
import { GroupStatus } from "src/enums/group-status.enum";
import { InputModule } from "src/input/input.module";
import { PipesModule } from "src/pipes/pipes.module";
import { SelectModule } from "src/select/select.module";
import { SharedUiModule } from "src/shared-ui/shared-ui.module";
import { AddGroup, UpdateGroup } from "src/store/group.state.actions";
import { TableModule } from "src/table/table.module";
import { UserAutocompleteModule } from "src/user-autocomplete/user-autocomplete.module";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { NgxsModule, Store } from "@ngxs/store";

import { GroupMemberFormComponent } from "../group-member-form/group-member-form.component";
import { buildGroupMemberForm } from "../utils/group-member.utils";
import { GroupFormComponent } from "./group-form.component";

describe('GroupFormComponent', () => {
  let component: GroupFormComponent;
  let fixture: ComponentFixture<GroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupFormComponent, GroupMemberFormComponent],
      imports: [
        ApiModule,
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

  it('should create group', () => {
    const createSpy = spyOn(TestBed.inject(GroupsService), 'createGroup');
    const storeSpy = spyOn(TestBed.inject(Store), 'dispatch');
    const routerSpy = spyOn(TestBed.inject(Router), 'navigateByUrl');

    const group: Group = {
      id: 1,
      name: 'test',
      isDefault: true,
      groupMembers: [],
      status: GroupStatus.ACTIVE,
    };

    const route = TestBed.inject(ActivatedRoute);
    route.snapshot.data = {
      formConfig: {
        mode: FormMode.add,
      },
    };

    component.ngOnInit();
    component.ngAfterViewInit();

    component.form.patchValue({
      name: group.name,
      isDefault: group.isDefault,
    });

    const returnValue = {
      ...component.form.value,
      id: 1,
    };

    createSpy.and.returnValue(of(returnValue));

    component.submit();

    expect(createSpy).toHaveBeenCalledWith({
      name: 'test',
      status: GroupStatus.ACTIVE,
      groupMembers: [],
    } as any);
    expect(storeSpy).toHaveBeenCalledWith(new AddGroup(returnValue));
    expect(routerSpy).toHaveBeenCalledWith('/groups/1/view');
  });

  it('should update group', () => {
    const updateSpy = spyOn(TestBed.inject(GroupsService), 'updateGroup');
    const storeSpy = spyOn(TestBed.inject(Store), 'dispatch');
    const routerSpy = spyOn(TestBed.inject(Router), 'navigateByUrl');

    const group: Group = {
      id: 1,
      name: 'test',
      isDefault: true,
      status: GroupStatus.ACTIVE,
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
    };

    const route = TestBed.inject(ActivatedRoute);
    route.snapshot.data = {
      group: group,
      formConfig: {
        mode: FormMode.edit,
      },
    };

    component.ngOnInit();
    component.ngAfterViewInit();

    component.form.patchValue({
      name: 'new name',
    });

    component.groupMembers.push(
      new FormGroup({
        userId: new FormControl(3),
        groupId: new FormControl(1),
        groupRole: new FormControl(GroupRole.EDITOR),
      })
    );

    const returnValue = {
      ...component.form.value,
      id: 1,
    };

    updateSpy.and.returnValue(of(returnValue));

    component.submit();

    expect(updateSpy).toHaveBeenCalledWith(
      {
        name: 'new name',
        status: GroupStatus.ACTIVE,
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
          {
            userId: 3,
            groupId: 1,
            groupRole: GroupRole.EDITOR,
          },
        ],
      } as Group,
      component.originalGroup?.id as number
    );
    expect(storeSpy).toHaveBeenCalledWith(new UpdateGroup(returnValue));
    expect(routerSpy).toHaveBeenCalledWith('/groups/1/view');
  });
});
