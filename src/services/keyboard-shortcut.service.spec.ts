import { TestBed } from '@angular/core/testing';
import { KeyboardShortcutService, KeyboardShortcutEvent } from './keyboard-shortcut.service';
import { KEYBOARD_SHORTCUT_ACTIONS } from '../constants/keyboard-shortcuts.constant';

describe('KeyboardShortcutService', () => {
  let service: KeyboardShortcutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyboardShortcutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('registerShortcut', () => {
    it('should register a new shortcut', () => {
      const shortcut = {
        key: 'a',
        ctrlKey: true,
        action: 'TEST_ACTION',
        description: 'Test action'
      };

      service.registerShortcut(shortcut);
      const shortcuts = service.getShortcuts();
      
      expect(shortcuts).toContain(jasmine.objectContaining({
        key: 'a',
        ctrlKey: true,
        action: 'TEST_ACTION'
      }));
    });
  });

  describe('unregisterShortcut', () => {
    it('should remove a registered shortcut', () => {
      const shortcut = {
        key: 'b',
        ctrlKey: true,
        action: 'REMOVE_ME'
      };

      service.registerShortcut(shortcut);
      service.unregisterShortcut(shortcut);
      
      const shortcuts = service.getShortcuts();
      expect(shortcuts).not.toContain(jasmine.objectContaining({
        action: 'REMOVE_ME'
      }));
    });
  });

  describe('handleKeyboardEvent', () => {
    it('should trigger action for matching shortcut', (done) => {
      const event = new KeyboardEvent('keydown', {
        key: 'i',
        ctrlKey: true
      });

      service.shortcutTriggered.subscribe((shortcutEvent: KeyboardShortcutEvent) => {
        expect(shortcutEvent.action).toBe(KEYBOARD_SHORTCUT_ACTIONS.ADD_ITEM);
        expect(shortcutEvent.event).toBe(event);
        done();
      });

      const handled = service.handleKeyboardEvent(event);
      expect(handled).toBe(true);
    });

    it('should not trigger action for non-matching shortcut', () => {
      const event = new KeyboardEvent('keydown', {
        key: 'z',
        ctrlKey: true
      });

      let triggered = false;
      service.shortcutTriggered.subscribe(() => {
        triggered = true;
      });

      const handled = service.handleKeyboardEvent(event);
      expect(handled).toBe(false);
      expect(triggered).toBe(false);
    });

    it('should prevent default for matching shortcuts', () => {
      const event = new KeyboardEvent('keydown', {
        key: 'i',
        ctrlKey: true
      });
      spyOn(event, 'preventDefault');

      service.handleKeyboardEvent(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });
  });

  describe('getShortcutsByAction', () => {
    it('should return shortcuts for specific action', () => {
      const shortcuts = service.getShortcutsByAction(KEYBOARD_SHORTCUT_ACTIONS.ADD_ITEM);
      expect(shortcuts.length).toBe(1);
      expect(shortcuts[0]).toEqual(jasmine.objectContaining({
        key: 'i',
        ctrlKey: true,
        action: KEYBOARD_SHORTCUT_ACTIONS.ADD_ITEM
      }));
    });
  });

  describe('showHint', () => {
    it('should emit hint visibility for item shortcuts', (done) => {
      let hintStates: boolean[] = [];
      
      service.showHint.subscribe((show: boolean) => {
        hintStates.push(show);
        
        if (hintStates.length === 2) {
          expect(hintStates[0]).toBe(true);
          expect(hintStates[1]).toBe(false);
          done();
        }
      });

      const event = new KeyboardEvent('keydown', {
        key: 'i',
        ctrlKey: true
      });

      service.handleKeyboardEvent(event);
      
      // Fast-forward the timeout
      jasmine.clock().install();
      jasmine.clock().tick(2001);
      jasmine.clock().uninstall();
    });

    it('should not show hint for non-item shortcuts', () => {
      let hintEmitted = false;
      
      service.showHint.subscribe(() => {
        hintEmitted = true;
      });

      // Register a custom shortcut that shouldn't show hint
      service.registerShortcut({
        key: 'x',
        action: 'CUSTOM_ACTION'
      });

      const event = new KeyboardEvent('keydown', { key: 'x' });
      service.handleKeyboardEvent(event);
      
      expect(hintEmitted).toBe(false);
    });
  });

  describe('clearHintTimeout', () => {
    it('should clear hint and emit false', (done) => {
      service.showHint.subscribe((show: boolean) => {
        if (!show) {
          done();
        }
      });

      service.clearHintTimeout();
    });
  });

  describe('default shortcuts', () => {
    it('should have default shortcuts initialized', () => {
      const shortcuts = service.getShortcuts();
      
      expect(shortcuts).toContain(jasmine.objectContaining({
        key: 'i',
        ctrlKey: true,
        action: KEYBOARD_SHORTCUT_ACTIONS.ADD_ITEM
      }));
      
      expect(shortcuts).toContain(jasmine.objectContaining({
        key: 'Enter',
        ctrlKey: true,
        action: 'SUBMIT_AND_CONTINUE'
      }));
      
      expect(shortcuts).toContain(jasmine.objectContaining({
        key: 'Enter',
        ctrlKey: true,
        shiftKey: true,
        action: 'SUBMIT_AND_FINISH'
      }));
      
      expect(shortcuts).toContain(jasmine.objectContaining({
        key: 'Escape',
        action: 'CANCEL'
      }));
    });
  });
});