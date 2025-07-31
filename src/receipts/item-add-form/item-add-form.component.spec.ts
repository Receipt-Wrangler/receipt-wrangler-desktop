import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormMode } from 'src/enums/form-mode.enum';
import { KeyboardShortcutService } from '../../services/keyboard-shortcut.service';
import { ItemAddFormComponent } from './item-add-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { Category, Group, Tag } from '../../open-api';

describe('ItemAddFormComponent', () => {
  let component: ItemAddFormComponent;
  let fixture: ComponentFixture<ItemAddFormComponent>;
  let keyboardShortcutService: jasmine.SpyObj<KeyboardShortcutService>;
  let shortcutTriggered$: Subject<any>;
  let showHint$: Subject<boolean>;

  beforeEach(async () => {
    shortcutTriggered$ = new Subject();
    showHint$ = new Subject();
    
    const keyboardSpy = jasmine.createSpyObj('KeyboardShortcutService', [
      'handleKeyboardEvent'
    ], {
      shortcutTriggered: shortcutTriggered$.asObservable(),
      showHint: showHint$.asObservable()
    });

    await TestBed.configureTestingModule({
      declarations: [ItemAddFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: KeyboardShortcutService, useValue: keyboardSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemAddFormComponent);
    component = fixture.componentInstance;
    keyboardShortcutService = TestBed.inject(KeyboardShortcutService) as jasmine.SpyObj<KeyboardShortcutService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.receiptId = '123';
    component.ngOnInit();
    
    expect(component.newItemFormGroup).toBeDefined();
    expect(component.newItemFormGroup.get('name')).toBeDefined();
    expect(component.newItemFormGroup.get('amount')).toBeDefined();
  });

  it('should setup keyboard shortcuts on init', () => {
    component.ngOnInit();
    
    // Emit a shortcut event
    shortcutTriggered$.next({ action: 'SUBMIT_AND_CONTINUE', event: new KeyboardEvent('keydown') });
    
    // Should have subscribed to the service
    expect(component.showKeyboardHint).toBeFalse();
  });

  it('should show keyboard hint when service emits', () => {
    component.ngOnInit();
    
    showHint$.next(true);
    expect(component.showKeyboardHint).toBeTrue();
    
    showHint$.next(false);
    expect(component.showKeyboardHint).toBeFalse();
  });

  describe('keyboard shortcut actions', () => {
    beforeEach(() => {
      component.ngOnInit();
      // Mock form as valid
      spyOn(component.newItemFormGroup, 'valid').and.returnValue(true);
      spyOn(component, 'onSubmitAndContinue');
      spyOn(component, 'onSubmitAndFinish');
      spyOn(component, 'onCancel');
    });

    it('should handle SUBMIT_AND_CONTINUE action', () => {
      shortcutTriggered$.next({ action: 'SUBMIT_AND_CONTINUE', event: new KeyboardEvent('keydown') });
      
      expect(component.onSubmitAndContinue).toHaveBeenCalled();
    });

    it('should handle SUBMIT_AND_FINISH action', () => {
      shortcutTriggered$.next({ action: 'SUBMIT_AND_FINISH', event: new KeyboardEvent('keydown') });
      
      expect(component.onSubmitAndFinish).toHaveBeenCalled();
    });

    it('should handle CANCEL action', () => {
      shortcutTriggered$.next({ action: 'CANCEL', event: new KeyboardEvent('keydown') });
      
      expect(component.onCancel).toHaveBeenCalled();
    });
  });

  describe('form submission', () => {
    beforeEach(() => {
      component.ngOnInit();
      component.newItemFormGroup.patchValue({
        name: 'Test Item',
        amount: 10.00
      });
    });

    it('should emit submitAndContinue event with item data', () => {
      spyOn(component.submitAndContinue, 'emit');
      
      component.onSubmitAndContinue();
      
      expect(component.submitAndContinue.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({
          name: 'Test Item',
          amount: 10.00,
          chargedToUserId: undefined
        })
      );
      expect(component.rapidAddMode).toBeTrue();
    });

    it('should emit submitAndFinish event with item data', () => {
      spyOn(component.submitAndFinish, 'emit');
      
      component.onSubmitAndFinish();
      
      expect(component.submitAndFinish.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({
          name: 'Test Item',
          amount: 10.00,
          chargedToUserId: undefined
        })
      );
    });

    it('should not submit if form is invalid', () => {
      spyOn(component.submitAndContinue, 'emit');
      component.newItemFormGroup.patchValue({ name: '' }); // Make form invalid
      
      component.onSubmitAndContinue();
      
      expect(component.submitAndContinue.emit).not.toHaveBeenCalled();
    });
  });

  it('should emit cancelled event on cancel', () => {
    spyOn(component.cancelled, 'emit');
    
    component.onCancel();
    
    expect(component.cancelled.emit).toHaveBeenCalled();
  });

  describe('field navigation', () => {
    beforeEach(() => {
      component.ngOnInit();
      // Mock focus methods
      spyOn(component as any, 'focusAmountField');
      spyOn(component as any, 'focusCategoryField');
      spyOn(component as any, 'focusTagField');
      spyOn(component, 'onSubmitAndContinue');
    });

    it('should focus amount field on name enter', () => {
      const event = new Event('keydown');
      spyOn(event, 'preventDefault');
      
      component.onNameEnter(event);
      
      expect(event.preventDefault).toHaveBeenCalled();
      expect(component['focusAmountField']).toHaveBeenCalled();
    });

    it('should submit directly if categories are hidden', () => {
      component.selectedGroup = {
        groupReceiptSettings: {
          hideItemCategories: true
        }
      } as Group;
      component.newItemFormGroup.patchValue({ name: 'Test', amount: 10 });
      
      const event = new Event('keydown');
      component.onAmountEnter(event);
      
      expect(component.onSubmitAndContinue).toHaveBeenCalled();
    });

    it('should focus category field if categories are shown', () => {
      component.selectedGroup = {
        groupReceiptSettings: {
          hideItemCategories: false
        }
      } as Group;
      
      const event = new Event('keydown');
      component.onAmountEnter(event);
      
      expect(component['focusCategoryField']).toHaveBeenCalled();
    });
  });

  it('should handle keyboard events in view mode', () => {
    component.mode = FormMode.view;
    const event = new KeyboardEvent('keydown');
    
    component.handleKeyboardShortcut(event);
    
    expect(keyboardShortcutService.handleKeyboardEvent).not.toHaveBeenCalled();
  });

  it('should handle keyboard events in edit mode', () => {
    component.mode = FormMode.edit;
    const event = new KeyboardEvent('keydown');
    
    component.handleKeyboardShortcut(event);
    
    expect(keyboardShortcutService.handleKeyboardEvent).toHaveBeenCalledWith(event);
  });

  it('should cleanup on destroy', () => {
    component.ngOnInit();
    spyOn(component['destroy$'], 'next');
    spyOn(component['destroy$'], 'complete');
    
    component.ngOnDestroy();
    
    expect(component['destroy$'].next).toHaveBeenCalled();
    expect(component['destroy$'].complete).toHaveBeenCalled();
  });
});