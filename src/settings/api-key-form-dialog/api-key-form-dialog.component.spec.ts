import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { ApiKeyResult, ApiKeyScope, ApiKeyService } from '../../open-api';
import { SnackbarService } from '../../services';
import { SharedUiModule } from '../../shared-ui/shared-ui.module';
import { ButtonModule } from '../../button';
import { InputModule } from '../../input';
import { SelectModule } from '../../select/select.module';

import { ApiKeyFormDialogComponent } from './api-key-form-dialog.component';

describe('ApiKeyFormDialogComponent', () => {
  let component: ApiKeyFormDialogComponent;
  let fixture: ComponentFixture<ApiKeyFormDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<ApiKeyFormDialogComponent>>;
  let mockApiKeyService: jasmine.SpyObj<ApiKeyService>;
  let mockSnackbarService: jasmine.SpyObj<SnackbarService>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockApiKeyService = jasmine.createSpyObj('ApiKeyService', ['createApiKey']);
    mockSnackbarService = jasmine.createSpyObj('SnackbarService', ['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [ApiKeyFormDialogComponent],
      imports: [
        ReactiveFormsModule,
        MatIconModule,
        SharedUiModule,
        ButtonModule,
        InputModule,
        SelectModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: ApiKeyService, useValue: mockApiKeyService },
        { provide: SnackbarService, useValue: mockSnackbarService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ApiKeyFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.form.get('name')?.value).toBe('');
    expect(component.form.get('description')?.value).toBe('');
    expect(component.form.get('scope')?.value).toBe(ApiKeyScope.R);
  });

  it('should create API key on valid form submission', () => {
    const mockResult: ApiKeyResult = { key: 'test-api-key-123' };
    mockApiKeyService.createApiKey.and.returnValue(of(mockResult));

    component.form.patchValue({
      name: 'Test API Key',
      description: 'Test description',
      scope: ApiKeyScope.Rw
    });

    component.submitButtonClicked();

    expect(mockApiKeyService.createApiKey).toHaveBeenCalledWith({
      name: 'Test API Key',
      description: 'Test description',
      scope: ApiKeyScope.Rw
    });
    expect(component.apiKeyResult).toEqual(mockResult);
    expect(mockSnackbarService.success).toHaveBeenCalledWith('API key created successfully');
  });

  it('should show error on invalid form submission', () => {
    component.form.patchValue({ name: '' }); // Invalid form

    component.submitButtonClicked();

    expect(mockApiKeyService.createApiKey).not.toHaveBeenCalled();
    expect(mockSnackbarService.error).toHaveBeenCalledWith('Please fill in all required fields');
  });

  it('should close dialog on cancel', () => {
    component.cancelButtonClicked();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should copy API key to clipboard', async () => {
    const mockClipboard = jasmine.createSpyObj('clipboard', ['writeText']);
    mockClipboard.writeText.and.returnValue(Promise.resolve());
    Object.defineProperty(navigator, 'clipboard', { value: mockClipboard });

    component.apiKeyResult = { key: 'test-key-123' };

    await component.copyToClipboard();

    expect(mockClipboard.writeText).toHaveBeenCalledWith('test-key-123');
    expect(mockSnackbarService.success).toHaveBeenCalledWith('API key copied to clipboard');
  });

  it('should close dialog with result', () => {
    const mockResult: ApiKeyResult = { key: 'test-api-key-123' };
    component.apiKeyResult = mockResult;

    component.closeDialog();

    expect(mockDialogRef.close).toHaveBeenCalledWith(mockResult);
  });
});