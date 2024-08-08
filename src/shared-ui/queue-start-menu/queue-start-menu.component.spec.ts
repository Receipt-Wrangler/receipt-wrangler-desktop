import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueStartMenuComponent } from './queue-start-menu.component';

describe('QueueStartMenuComponent', () => {
  let component: QueueStartMenuComponent;
  let fixture: ComponentFixture<QueueStartMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QueueStartMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QueueStartMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
