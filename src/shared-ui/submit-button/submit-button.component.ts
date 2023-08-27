import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { FormMode } from 'src/enums/form-mode.enum';
import { FormButtonComponent } from '../form-button/form-button.component';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscribable, Subscription, startWith, tap } from 'rxjs';
import { LayoutState } from 'src/store/layout.state';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SubmitButtonComponent
  extends FormButtonComponent
  implements OnChanges
{
  @Input() public onlyIcon: boolean = true;

  @Input() public disableOnLoading: boolean = false;

  public formMode = FormMode;

  public disabledSubscription!: Subscription;

  public originalDisabledState: boolean = false;

  constructor(private store: Store) {
    super();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['disableOnLoading'].currentValue) {
      this.disabledSubscription = this.store
        .select(LayoutState.showProgressBar)
        .pipe(
          startWith(this.store.selectSnapshot(LayoutState.showProgressBar)),
          tap((isShown) => {
            if (isShown) {
              this.originalDisabledState = this.disabled;
              this.disabled = true;
            } else {
              this.disabled = this.originalDisabledState;
            }
          })
        )
        .subscribe();
    } else {
      if (this.disabledSubscription) {
        this.disabledSubscription.unsubscribe();
      }
    }
  }
}
