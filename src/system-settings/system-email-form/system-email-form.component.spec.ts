import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NgxsModule } from "@ngxs/store";
import { ApiModule, SystemEmail } from "../../open-api";
import { PipesModule } from "../../pipes";
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
      password: "password"
    });
  });
});
