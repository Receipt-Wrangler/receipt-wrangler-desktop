import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  DEFAULT_SNACKBAR_ACTION,
  DEFAULT_SNACKBAR_CONFIG,
} from 'constants/snackbar.constant';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar) {}

  public error(message: string): void {
    this.snackbar.open(message, DEFAULT_SNACKBAR_ACTION, {
      ...DEFAULT_SNACKBAR_CONFIG,
      panelClass: ['error-snackbar'],
    });
  }
}
