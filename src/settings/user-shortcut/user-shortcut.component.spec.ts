import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShortcutComponent } from './user-shortcut.component';

describe('UserShortcutComponent', () => {
  let component: UserShortcutComponent;
  let fixture: ComponentFixture<UserShortcutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserShortcutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserShortcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
