import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select } from '@ngxs/store';
import { GroupState } from '@receipt-wrangler/receipt-wrangler-core';
import { Observable } from 'rxjs';
import { BaseFormComponent } from 'src/form/base-form/base-form.component';

@Component({
  selector: 'app-group-settings',
  templateUrl: './group-settings.component.html',
  styleUrls: ['./group-settings.component.scss'],
})
export class GroupSettingsComponent
  extends BaseFormComponent
  implements OnInit
{
  @Select(GroupState.settingsLinkBase)
  public settingsLinkBase!: Observable<string>;

  constructor(private activatedRoute: ActivatedRoute) {
    super();
  }

  public ngOnInit(): void {
    this.formConfig = this.activatedRoute.snapshot.data['formConfig'];
  }

  public submit(): void {
    if (this.form.valid) {
    }
  }
}
