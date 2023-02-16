import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGroupFormComponent } from './create-group-form.component';

describe('CreateGroupFormComponent', () => {
  let component: CreateGroupFormComponent;
  let fixture: ComponentFixture<CreateGroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGroupFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
