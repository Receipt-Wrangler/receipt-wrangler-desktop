import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { FormMode } from 'src/enums/form-mode.enum';
import { FormConfig } from 'src/interfaces';
import { User } from 'src/models';
import { AuthState } from 'src/store/auth.state';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  public form: FormGroup = new FormGroup({});

  public user!: User;

  public formConfig!: FormConfig;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.user = this.store.selectSnapshot(AuthState.loggedInUser);
    this.formConfig = this.route?.snapshot?.data?.['formConfig'];
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      username: this.user?.username ?? '',
      displayName: this.user?.displayName ?? '',
    });
  }
}
