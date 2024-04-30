import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { NgxsModule } from "@ngxs/store";
import { of } from "rxjs";
import { FormMode } from "../../enums/form-mode.enum";
import { ApiModule, SystemEmail, SystemEmailService } from "../../open-api";
import { PipesModule } from "../../pipes";
import { ConfirmationDialogComponent } from "../../shared-ui/confirmation-dialog/confirmation-dialog.component";
import { SharedUiModule } from "../../shared-ui/shared-ui.module";

import { SystemEmailFormComponent } from "./system-email-form.component";

describe("SystemEmailFormComponent", () => {
  let component: SystemEmailFormComponent;
  let fixture: ComponentFixture<SystemEmailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SystemEmailFormComponent],
      imports: [
        ApiModule,
        HttpClientTestingModule,
        NgxsModule.forRoot([]),
        PipesModule,
        MatDialogModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        SharedUiModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                formConfig: {}
              }
            }
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SystemEmailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("init form when there is no original data", () => {
    component.ngOnInit();

    expect(component.form.value).toEqual({
      host: null,
      port: null,
      username: null,
      password: null
    });
  });

  it("init form when there is original data", () => {
    const activatedRoute = TestBed.inject(ActivatedRoute);
    activatedRoute.snapshot.data["systemEmail"] = {
      host: "host",
      port: 123,
      username: "username",
      password: "password"
    } as SystemEmail;
    component.ngOnInit();


    expect(component.form.value).toEqual({
      host: "host",
      port: 123,
      username: "username",
      password: null
    });
  });

  it("should call create", () => {
    const serviceSpy = spyOn(TestBed.inject(SystemEmailService), "createSystemEmail").and.returnValue(of({} as any));
    component.formConfig = { mode: FormMode.add } as any;
    component.submit();

    expect(serviceSpy).toHaveBeenCalled();
  });

  it("should call update", () => {
    component.originalSystemEmail = { id: 1 } as any;
    const serviceSpy = spyOn(TestBed.inject(SystemEmailService), "updateSystemEmailById").and.returnValue(of({} as any));
    component.formConfig = { mode: FormMode.edit } as any;
    component.submit();

    expect(serviceSpy).toHaveBeenCalled();
  });

  it("should pop dialog", () => {
    component.originalSystemEmail = { id: 1 } as any;
    component.form.get("password")?.markAsDirty();
    const matDialogSpy = spyOn(TestBed.inject(MatDialog), "open").and.returnValue({
      componentInstance: {},
      afterClosed: () => of(undefined)
    } as any);
    component.formConfig = { mode: FormMode.edit } as any;
    component.submit();

    expect(matDialogSpy).toHaveBeenCalledWith(ConfirmationDialogComponent);
  });
});
