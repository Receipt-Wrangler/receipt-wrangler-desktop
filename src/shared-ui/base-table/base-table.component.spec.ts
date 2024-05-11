import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTableComponent } from './base-table.component';

describe('BaseTableComponent', () => {
  let component: BaseTableComponent;
  let fixture: ComponentFixture<BaseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
