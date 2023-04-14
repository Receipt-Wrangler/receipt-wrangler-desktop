import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { of } from 'rxjs';
import { ButtonModule } from 'src/button/button.module';
import { FeatureDirective } from 'src/directives/feature.directive';
import { InputModule } from 'src/input/input.module';
import { PipesModule } from 'src/pipes/pipes.module';
import { AppInitService } from 'src/services/app-init.service';
import { SnackbarService } from 'src/services/snackbar.service';
import { AuthForm } from './auth-form.component';

describe('AuthForm', () => {
  let component: AuthForm;
  let fixture: ComponentFixture<AuthForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthForm, FeatureDirective],
      imports: [
        ButtonModule,
        HttpClientTestingModule,
        InputModule,
        MatSnackBarModule,
        NgxsModule.forRoot([]),
        NoopAnimationsModule,
        PipesModule,
        ReactiveFormsModule,
      ],
      providers: [
        SnackbarService,
        AppInitService,
        {
          provide: ActivatedRoute,
          useValue: {
            data: of(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
