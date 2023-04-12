import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgxsModule, Store } from '@ngxs/store';
import { AutocompleteModule } from 'src/autocomplete/autocomplete.module';
import { ButtonModule } from 'src/button/button.module';
import { InputModule } from 'src/input/input.module';
import { PipesModule } from 'src/pipes/pipes.module';
import { SelectModule } from 'src/select/select.module';
import { SharedUiModule } from 'src/shared-ui/shared-ui.module';
import { UserAutocompleteModule } from 'src/user-autocomplete/user-autocomplete.module';
import { GroupMemberFormComponent } from './group-member-form.component';
import { AuthState } from 'src/store/auth.state';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

describe('GroupMemberFormComponent', () => {
  let component: GroupMemberFormComponent;
  let fixture: ComponentFixture<GroupMemberFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupMemberFormComponent],
      imports: [
        AutocompleteModule,
        ButtonModule,
        InputModule,
        MatDialogModule,
        NgxsModule.forRoot([AuthState]),
        PipesModule,
        SelectModule,
        SharedUiModule,
        ReactiveFormsModule,
        UserAutocompleteModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupMemberFormComponent);
    component = fixture.componentInstance;
    TestBed.inject(Store).reset({
      auth: { userId: '1' },
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
