import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { AuthService } from 'src/api/auth.service';
import { applyApiErrors } from 'src/utils';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public form: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.initForm();
  }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      displayname: ['', Validators.required],
    });
  }

  public submit(): void {
    if (this.form.valid) {
      this.authService
        .signUp(this.form.value)
        .pipe(catchError((err) => of(applyApiErrors(this.form, err))))
        .subscribe();
    }
  }
}
