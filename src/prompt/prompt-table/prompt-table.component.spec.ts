import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute } from "@angular/router";
import { NgxsModule } from "@ngxs/store";
import { PromptTableState } from "../../store/prompt-table.state";
import { TableModule } from "../../table/table.module";

import { PromptTableComponent } from "./prompt-table.component";

describe("PromptTableComponent", () => {
  let component: PromptTableComponent;
  let fixture: ComponentFixture<PromptTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromptTableComponent],
      imports: [TableModule, HttpClientTestingModule, NgxsModule.forRoot([PromptTableState]), NoopAnimationsModule],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            data: {
              prompts: []
            }
          }
        }
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PromptTableComponent);
    component = fixture.componentInstance;

  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
