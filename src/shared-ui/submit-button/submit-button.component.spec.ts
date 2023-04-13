import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonModule } from 'src/button/button.module';
import { SubmitButtonComponent } from './submit-button.component';
import { ActivatedRoute } from '@angular/router';

describe('SubmitButtonComponent', () => {
  let component: SubmitButtonComponent;
  let fixture: ComponentFixture<SubmitButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubmitButtonComponent],
      imports: [ButtonModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SubmitButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
