import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
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

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  public ngOnInit(): void {
    this.user = this.store.selectSnapshot(AuthState.loggedInUser);
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      username: this.user?.username ?? '',
      displayName: this.user?.displayName ?? '',
    });
  }
}
