import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyUserConversionDialogComponent } from './dummy-user-conversion-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { SnackbarService } from 'src/services/snackbar.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PipesModule } from 'src/pipes/pipes.module';
import { UsersService } from 'src/api/users.service';
import { of } from 'rxjs';
import { UserState } from 'src/store/user.state';
import { UpdateUser } from 'src/store/user.state.actions';

describe('DummyUserConversionDialogComponent', () => {
  let component: DummyUserConversionDialogComponent;
  let fixture: ComponentFixture<DummyUserConversionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DummyUserConversionDialogComponent],
      imports: [
        HttpClientTestingModule,
        NgxsModule.forRoot([UserState]),
        MatSnackBarModule,
        PipesModule,
      ],
      providers: [
        SnackbarService,
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {},
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(DummyUserConversionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init form correctly', () => {
    component.ngOnInit();

    expect(component.form.value).toEqual({
      password: '',
    });
  });

  it('should call close when cancel button is clicked', () => {
    const dialogRefSpy = spyOn(component.matDialogRef, 'close');
    component.cancelButtonClicked();

    expect(dialogRefSpy).toHaveBeenCalledTimes(1);
  });

  it('should call service and call update in state', () => {
    const usersService = TestBed.inject(UsersService);

    const usersSpy = spyOn(usersService, 'convertDummyUserToNormalUser');
    usersSpy.and.returnValue(of(undefined));

    const store = TestBed.inject(Store);
    const storeSpy = spyOn(store, 'dispatch');
    storeSpy.and.returnValue(of(undefined));

    const dialogSpy = spyOn(component.matDialogRef, 'close');
    dialogSpy.and.returnValue(undefined);

    spyOn(TestBed.inject(SnackbarService), 'success').and.returnValue(
      undefined
    );

    component.user = {
      id: 1,
    } as any;

    component.ngOnInit();

    component.form.patchValue({
      password: 'hello world',
    });

    component.submitButtonClicked();

    expect(usersSpy).toHaveBeenCalledWith('1', {
      password: 'hello world',
    });
    expect(storeSpy).toHaveBeenCalledWith(
      new UpdateUser('1', { id: 1, isDummyUser: false } as any)
    );
    expect(dialogSpy).toHaveBeenCalledOnceWith(true);
  });
});
