import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMemberFormComponent } from './group-member-form.component';

describe('GroupMemberFormComponent', () => {
  let component: GroupMemberFormComponent;
  let fixture: ComponentFixture<GroupMemberFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupMemberFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupMemberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
