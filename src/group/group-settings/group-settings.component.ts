import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Select } from '@ngxs/store';
import { GroupState } from '@receipt-wrangler/receipt-wrangler-core';
import { Observable } from 'rxjs';
import { FormConfig } from 'src/interfaces';

@Component({
  selector: 'app-group-settings',
  templateUrl: './group-settings.component.html',
  styleUrls: ['./group-settings.component.scss'],
})
export class GroupSettingsComponent implements OnInit {
  @Input() public formConfig!: FormConfig;

  @Select(GroupState.settingsLinkBase)
  public settingsLinkBase!: Observable<string>;

  public form: FormGroup = new FormGroup({});

  constructor(private activatedRoute: ActivatedRoute) {}

  public ngOnInit(): void {
    this.formConfig = this.activatedRoute.snapshot.data['formConfig'];
  }

  public submit(): void {
    if (this.form.valid) {
    }
  }
}
