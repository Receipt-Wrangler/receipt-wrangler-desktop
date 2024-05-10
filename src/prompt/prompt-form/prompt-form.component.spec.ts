import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { PipesModule } from "../../pipes";
import { SharedUiModule } from "../../shared-ui/shared-ui.module";

import { PromptFormComponent } from "./prompt-form.component";

describe("PromptFormComponent", () => {
  let component: PromptFormComponent;
  let fixture: ComponentFixture<PromptFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromptFormComponent],
      imports: [SharedUiModule, PipesModule, ReactiveFormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                prompt: {},
                formConfig: {}
              }
            }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PromptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should init form without data", () => {
    component.ngOnInit();

    expect(component.form.value).toEqual({
      name: null,
      description: null,
      prompt: null,
    });
  });

  it("should init form with data", () => {
    const activatedRoute = TestBed.inject(ActivatedRoute);
    const prompt = {
      name: "ChatGPT",
      description: "ChatGPT prompt",
      prompt: "do the magic!"
    } as any;
    activatedRoute.snapshot.data["prompt"] = prompt;

    component.ngOnInit();

    expect(component.form.value).toEqual({
      name: prompt.name,
      description: prompt.description,
      prompt: prompt.prompt,
    });
  });
});
