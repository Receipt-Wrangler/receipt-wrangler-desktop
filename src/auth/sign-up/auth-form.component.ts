import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { BehaviorSubject, take, tap } from 'rxjs';
import { GroupState } from '../../store/group.state';
import { UserValidators } from '../../validators/user-validators';
import { AuthFormUtil } from './auth-form.util';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  providers: [UserValidators],
})
export class AuthForm implements OnInit {
  @Input() public additionalFieldsTemplate?: TemplateRef<any>;

  @Input() public emitSubmit: boolean = false;

  @Output() public submitted: EventEmitter<void> = new EventEmitter<void>();

  public form: FormGroup = new FormGroup({});
  public isSignUp: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public headerText: string = '';
  public primaryButtonText: string = '';
  public secondaryButtonText: string = '';
  public secondaryButtonRouterLink: string[] = [];

  constructor(
    protected authFormUtil: AuthFormUtil,
    protected formBuilder: FormBuilder,
    protected route: ActivatedRoute,
    protected router: Router,
    protected store: Store,
    protected userValidators: UserValidators
  ) {}

  public ngOnInit(): void {
    this.initForm();
    this.listenForRouteChanges();
    this.listenForIsSignUpChanges();
  }

  private listenForRouteChanges(): void {
    this.route.data
      .pipe(
        tap((data) => {
          this.isSignUp.next(!!data?.['isSignUp']);
        })
      )
      .subscribe();
  }

  private listenForIsSignUpChanges(): void {
    this.isSignUp
      .pipe(
        tap((isSignUp) => {
          if (isSignUp) {
            this.headerText = 'Sign Up';
            this.primaryButtonText = 'Sign Up';
            this.secondaryButtonRouterLink = ['/auth/login'];
            this.secondaryButtonText = 'Back to Login';
            this.form
              .get('username')
              ?.addAsyncValidators(this.userValidators.uniqueUsername(0, ''));
            this.form.addControl(
              'displayname',
              new FormControl('', Validators.required)
            );
          } else {
            this.headerText = 'Login';
            this.primaryButtonText = 'Login';
            this.secondaryButtonRouterLink = ['/auth/sign-up'];
            this.secondaryButtonText = 'Sign Up';
            this.form
              .get('username')
              ?.removeAsyncValidators(
                this.userValidators.uniqueUsername(0, '')
              );
            this.form.removeControl('displayname');
          }
        })
      )
      .subscribe();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  public submit(): void {
    if (this.emitSubmit) {
      this.submitted.emit();
    } else {
      const isSignUp = this.isSignUp.getValue();

      this.authFormUtil
        .getSubmitObservable(this.form, isSignUp)
        .pipe(
          take(1),
          tap(() => {
            this.router.navigate([
              this.store.selectSnapshot(GroupState.dashboardLink),
            ]);
          })
        )
        .subscribe();
    }
  }
}
