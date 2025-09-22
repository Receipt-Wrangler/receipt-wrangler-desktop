import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { of } from 'rxjs';
import { ApiKeyResult, ApiKeyScope, ApiKeyService, ApiKeyView } from '../../open-api';
import { SnackbarService } from '../../services';
import { SharedUiModule } from '../../shared-ui/shared-ui.module';
import { LayoutState } from '../../store/layout.state';
import { ButtonModule } from '../../button';
import { InputModule } from '../../input';
import { PipesModule } from '../../pipes/pipes.module';
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
    mockApiKeyService = jasmine.createSpyObj('ApiKeyService', ['createApiKey', 'updateApiKey']);
    mockSnackbarService = jasmine.createSpyObj('SnackbarService', ['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [ApiKeyFormDialogComponent],
      imports: [
        ReactiveFormsModule,
        MatIconModule,
        SharedUiModule,
        ButtonModule,
        InputModule,
        PipesModule,
        SelectModule,
        NgxsModule.forRoot([LayoutState])
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: ApiKeyService, useValue: mockApiKeyService },
        { provide: SnackbarService, useValue: mockSnackbarService },
        { provide: ActivatedRoute, useValue: {} }
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
    mockApiKeyService.createApiKey.and.returnValue(of(mockResult) as any);

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

  it('should update API key when editing existing API key', () => {
    const mockApiKey: ApiKeyView = {
      id: '123',
      name: 'Existing API Key',
      description: 'Existing description',
      scope: ApiKeyScope.R
    };
    component.apiKey = mockApiKey;
    component.ngOnInit(); // Re-initialize form with existing data

    mockApiKeyService.updateApiKey.and.returnValue(of({}) as any);

    component.form.patchValue({
      name: 'Updated API Key',
      description: 'Updated description',
      scope: ApiKeyScope.Rw
    });

    component.submitButtonClicked();

    expect(mockApiKeyService.updateApiKey).toHaveBeenCalledWith('123', {
      name: 'Updated API Key',
      description: 'Updated description',
      scope: ApiKeyScope.Rw
    });
    expect(mockSnackbarService.success).toHaveBeenCalledWith('API key updated successfully');
    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should initialize form with existing API key data when editing', () => {
    const mockApiKey: ApiKeyView = {
      id: '123',
      name: 'Existing API Key',
      description: 'Existing description',
      scope: ApiKeyScope.Rw
    };
    component.apiKey = mockApiKey;
    component.ngOnInit(); // Re-initialize form

    expect(component.form.get('name')?.value).toBe('Existing API Key');
    expect(component.form.get('description')?.value).toBe('Existing description');
    expect(component.form.get('scope')?.value).toBe(ApiKeyScope.Rw);
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

  it('should close dialog with result when creating new API key', () => {
    const mockResult: ApiKeyResult = { key: 'test-api-key-123' };
    component.apiKeyResult = mockResult;

    component.closeDialog();

    expect(mockDialogRef.close).toHaveBeenCalledWith(mockResult);
  });

  it('should close dialog with true when editing existing API key', () => {
    const mockApiKey: ApiKeyView = { id: '123', name: 'Test API Key' };
    component.apiKey = mockApiKey;

    component.closeDialog();

    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });
});