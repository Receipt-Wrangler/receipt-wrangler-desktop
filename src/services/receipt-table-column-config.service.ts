import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, map } from 'rxjs';
import { DEFAULT_RECEIPT_TABLE_COLUMNS, ReceiptTableColumnConfig } from '../interfaces';
import { SetColumnConfig } from '../store/receipt-table.actions';
import { AuthState } from '../store';

@Injectable({
  providedIn: 'root'
})
export class ReceiptTableColumnConfigService {
  private readonly STORAGE_KEY = 'receiptTableColumns';

  constructor(private store: Store) {}

  public loadColumnConfiguration(): void {
    const currentUserId = this.store.selectSnapshot(AuthState.userId);
    if (!currentUserId) {
      return;
    }

    const storageKey = `${this.STORAGE_KEY}_${currentUserId}`;
    const savedConfig = localStorage.getItem(storageKey);
    
    if (savedConfig) {
      try {
        const columnConfig: ReceiptTableColumnConfig[] = JSON.parse(savedConfig);
        this.store.dispatch(new SetColumnConfig(columnConfig));
      } catch (error) {
        console.warn('Failed to parse saved column configuration, using defaults:', error);
        this.store.dispatch(new SetColumnConfig(DEFAULT_RECEIPT_TABLE_COLUMNS));
      }
    } else {
      this.store.dispatch(new SetColumnConfig(DEFAULT_RECEIPT_TABLE_COLUMNS));
    }
  }

  public saveColumnConfiguration(columnConfig: ReceiptTableColumnConfig[]): void {
    const currentUserId = this.store.selectSnapshot(AuthState.userId);
    if (!currentUserId) {
      return;
    }

    const storageKey = `${this.STORAGE_KEY}_${currentUserId}`;
    try {
      localStorage.setItem(storageKey, JSON.stringify(columnConfig));
    } catch (error) {
      console.warn('Failed to save column configuration:', error);
    }
  }

  public resetToDefaults(): void {
    const currentUserId = this.store.selectSnapshot(AuthState.userId);
    if (!currentUserId) {
      return;
    }

    const storageKey = `${this.STORAGE_KEY}_${currentUserId}`;
    localStorage.removeItem(storageKey);
    this.store.dispatch(new SetColumnConfig(DEFAULT_RECEIPT_TABLE_COLUMNS));
  }

  public getCurrentUserId(): Observable<string | undefined> {
    return this.store.select(AuthState.userId);
  }
}