import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrettyJsonComponent } from './pretty-json.component';

describe('PrettyJsonComponent', () => {
  let component: PrettyJsonComponent;
  let fixture: ComponentFixture<PrettyJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrettyJsonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrettyJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
