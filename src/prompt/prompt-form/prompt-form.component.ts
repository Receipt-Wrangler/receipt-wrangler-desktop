import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BaseFormComponent } from "../../form";
import { Prompt } from "../../open-api";

@Component({
  selector: "app-prompt-form",
  templateUrl: "./prompt-form.component.html",
  styleUrl: "./prompt-form.component.scss"
})
export class PromptFormComponent extends BaseFormComponent implements OnInit {
  public originalPrompt?: Prompt;

  public promptVariables = ["categories", "tags"];

  constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
    super();
  }


  public ngOnInit() {
    this.originalPrompt = this.activatedRoute.snapshot.data["prompt"];
    this.setFormConfigFromRoute(this.activatedRoute);
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: [this.originalPrompt?.name, Validators.required],
      description: [this.originalPrompt?.description],
      prompt: [this.originalPrompt?.prompt, Validators.required],
    });
  }

  public submit(): void {
    if (this.form.valid) {

    }
  }
}
