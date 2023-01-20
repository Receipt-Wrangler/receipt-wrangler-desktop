import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocomleteComponent } from './autocomlete.component';

describe('AutocomleteComponent', () => {
  let component: AutocomleteComponent;
  let fixture: ComponentFixture<AutocomleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocomleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocomleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
