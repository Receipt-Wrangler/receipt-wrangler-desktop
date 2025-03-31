import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NgxsModule } from "@ngxs/store";
import { PipesModule } from "src/pipes/pipes.module";

import { ShareListComponent } from "./share-list.component";

describe("ShareListComponent", () => {
  let component: ShareListComponent;
  let fixture: ComponentFixture<ShareListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShareListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [PipesModule, NgxsModule.forRoot([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { data: {} } },
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ShareListComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({});
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
