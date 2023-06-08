import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormComponent } from './user-form.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { PipesModule } from 'src/pipes/pipes.module';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { User } from 'src/models';
import { UserRole } from 'src/enums/user_role.enum';
import { UsersService } from 'src/api/users.service';
import { AuthService } from 'src/api/auth.service';
import { of } from 'rxjs';
import { AddUser, UpdateUser } from 'src/store/user.state.actions';
import { UserState } from 'src/store/user.state';
import { SnackbarService } from 'src/services/snackbar.service';
import { AuthState } from 'src/store/auth.state';
import { compileComponentFromMetadata } from '@angular/compiler';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFormComponent],
      imports: [
        HttpClientTestingModule,
        NgxsModule.forRoot([AuthState, UserState]),
        ReactiveFormsModule,
        PipesModule,
        MatDialogModule,
        MatSnackBarModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {},
          },
        },
        SnackbarService,
      ],

      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init empty form correctly', () => {
    component.ngOnInit();

    expect(component.form.value).toEqual({
      displayName: '',
      username: '',
      userRole: '',
      password: '',
      isDummyUser: false,
    });
  });

  it('should init form with user data correctly', () => {
    const user: User = {
      id: 1,
      displayName: 'Pizza man',
      username: 'Waffle guy',
      isDummyUser: false,
      userRole: UserRole.ADMIN,
    } as User;

    component.user = user;
    component.ngOnInit();

    console.warn(component.form.value);

    expect(component.form.value).toEqual({
      displayName: 'Pizza man',
      username: 'Waffle guy',
      userRole: UserRole.ADMIN,
    });
    expect(component.form.get('isDummyUser')?.value).toEqual(false);
  });

  it('should attempt to update user on submit and get refresh token if the user is updating his/her own record', () => {
    store.reset({
      auth: {
        userId: '1',
      },
    });

    spyOn(TestBed.inject(SnackbarService), 'success').and.returnValue();
    spyOn(TestBed.inject(UsersService), 'getUsernameCount').and.returnValue(
      of(0)
    );
    const userServiceSpy = spyOn(TestBed.inject(UsersService), 'updateUser');
    userServiceSpy.and.returnValue(of(undefined));

    const authServiceSpy = spyOn(
      TestBed.inject(AuthService),
      'getNewRefreshToken'
    );
    authServiceSpy.and.returnValue(of(undefined));

    const storeSpy = spyOn(TestBed.inject(Store), 'dispatch');
    storeSpy.and.returnValue(of(undefined));

    const dialogRefSpy = spyOn(component.matDialogRef, 'close');

    const user: User = {
      id: 1,
      displayName: 'Pizza man',
      username: 'Waffle guy',
      isDummyUser: false,
      userRole: UserRole.ADMIN,
    } as User;

    component.user = user;
    component.ngOnInit();

    component.submit();

    expect(userServiceSpy).toHaveBeenCalledWith('1', {
      displayName: 'Pizza man',
      username: 'Waffle guy',
      userRole: UserRole.ADMIN,
    } as User);

    expect(storeSpy).toHaveBeenCalledOnceWith(
      new UpdateUser('1', {
        ...component.user,
        ...component.form.value,
      })
    );

    expect(authServiceSpy).toHaveBeenCalled();

    expect(dialogRefSpy).toHaveBeenCalledWith(true);
  });

  it('should attempt to update user on submit and not get refresh token if the user is not updating his/her own record', () => {
    store.reset({
      auth: {
        userId: '2',
      },
    });

    spyOn(TestBed.inject(SnackbarService), 'success').and.returnValue();
    spyOn(TestBed.inject(UsersService), 'getUsernameCount').and.returnValue(
      of(0)
    );
    const userServiceSpy = spyOn(TestBed.inject(UsersService), 'updateUser');
    userServiceSpy.and.returnValue(of(undefined));

    const authServiceSpy = spyOn(
      TestBed.inject(AuthService),
      'getNewRefreshToken'
    );
    authServiceSpy.and.returnValue(of(undefined));

    const storeSpy = spyOn(TestBed.inject(Store), 'dispatch');
    storeSpy.and.returnValue(of(undefined));

    const dialogRefSpy = spyOn(component.matDialogRef, 'close');

    const user: User = {
      id: 1,
      displayName: 'Pizza man',
      username: 'Waffle guy',
      isDummyUser: false,
      userRole: UserRole.ADMIN,
    } as User;

    component.user = user;
    component.ngOnInit();

    component.submit();

    expect(userServiceSpy).toHaveBeenCalledWith('1', {
      displayName: 'Pizza man',
      username: 'Waffle guy',
      userRole: UserRole.ADMIN,
    } as User);

    expect(storeSpy).toHaveBeenCalledOnceWith(
      new UpdateUser('1', {
        ...component.user,
        ...component.form.value,
      })
    );
    expect(component.form.get('isDummyUser')?.value).toEqual(false);

    expect(authServiceSpy).toHaveBeenCalledTimes(0);

    expect(dialogRefSpy).toHaveBeenCalledWith(true);
  });

  it('should attempt to create user', () => {
    spyOn(TestBed.inject(SnackbarService), 'success').and.returnValue();
    spyOn(TestBed.inject(UsersService), 'getUsernameCount').and.returnValue(
      of(0)
    );
    const user: User = {
      id: 1,
      displayName: 'Pizza man',
      username: 'Waffle guy',
      isDummyUser: false,
      userRole: UserRole.ADMIN,
    } as User;

    const userServiceSpy = spyOn(TestBed.inject(UsersService), 'createUser');
    userServiceSpy.and.returnValue(of(user));

    const storeSpy = spyOn(TestBed.inject(Store), 'dispatch');
    storeSpy.and.returnValue(of(undefined));

    const dialogRefSpy = spyOn(component.matDialogRef, 'close');
    component.ngOnInit();

    component.form.patchValue({
      displayName: 'Pizza man',
      username: 'Waffle guy',
      isDummyUser: false,
      password: 'Dough boy',
      userRole: UserRole.ADMIN,
    });

    component.submit();

    expect(userServiceSpy).toHaveBeenCalledWith({
      displayName: 'Pizza man',
      username: 'Waffle guy',
      isDummyUser: false,
      userRole: UserRole.ADMIN,
      password: 'Dough boy',
    } as any);

    expect(storeSpy).toHaveBeenCalledOnceWith(new AddUser(user));

    expect(dialogRefSpy).toHaveBeenCalledWith(true);
  });

  it('should disable empty and disable password field if isDummyUser is true', () => {
    component.ngOnInit();
    component.form.patchValue({
      isDummyUser: true,
    });

    const passwordField = component.form.get('password');

    expect(passwordField?.disabled).toEqual(true);
    expect(passwordField?.value).toEqual('');
    expect(passwordField?.hasValidator(Validators.required)).toEqual(false);
  });

  it('should disable empty and disable password field if isDummyUser is false', () => {
    component.ngOnInit();
    component.form.patchValue({
      isDummyUser: true,
    });

    component.form.patchValue({
      isDummyUser: false,
    });

    const passwordField = component.form.get('password');

    expect(passwordField?.disabled).toEqual(false);
    expect(passwordField?.value).toEqual('');
    expect(passwordField?.hasValidator(Validators.required)).toEqual(true);
  });

  it('should disable isDummyUser if user is defined', () => {
    component.user = {} as User;

    component.ngOnInit();

    const isDummyUserField = component.form.get('isDummyUser');

    expect(isDummyUserField?.disabled).toEqual(true);
  });
});
