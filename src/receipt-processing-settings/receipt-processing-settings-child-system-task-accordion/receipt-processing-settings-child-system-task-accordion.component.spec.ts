import {ComponentFixture, TestBed} from '@angular/core/testing';

import {
  ReceiptProcessingSettingsChildSystemTaskAccordionComponent
} from './receipt-processing-settings-child-system-task-accordion.component';
import {AccordionModule} from "ngx-bootstrap/accordion";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('ReceiptProcessingSettingsChildSystemTaskAccordionComponent', () => {
  let component: ReceiptProcessingSettingsChildSystemTaskAccordionComponent;
  let fixture: ComponentFixture<ReceiptProcessingSettingsChildSystemTaskAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceiptProcessingSettingsChildSystemTaskAccordionComponent],
      imports: [AccordionModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReceiptProcessingSettingsChildSystemTaskAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
