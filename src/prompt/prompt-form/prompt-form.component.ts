import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { take, tap } from "rxjs";
import { BaseFormComponent } from "../../form";
import { Prompt, PromptService } from "../../open-api";
import { SnackbarService } from "../../services";

@Component({
  selector: "app-prompt-form",
  templateUrl: "./prompt-form.component.html",
  styleUrl: "./prompt-form.component.scss"
})
export class PromptFormComponent extends BaseFormComponent implements OnInit {
  public originalPrompt?: Prompt;

  public promptVariables = ["categories", "tags"];

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private promptService: PromptService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {
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
    if (this.form.valid && this.originalPrompt) {
      this.updatePrompt();
    }
  }

  private updatePrompt(): void {
    this.promptService.updatePromptById(this.originalPrompt?.id ?? 0, this.form.value)
      .pipe(
        take(1),
        tap(() => {
          this.snackbarService.success("Prompt updated successfully");
          this.router.navigate(["/system-settings/prompts", this.originalPrompt?.id, "view"]);
        })
      )
      .subscribe();
  }
}
