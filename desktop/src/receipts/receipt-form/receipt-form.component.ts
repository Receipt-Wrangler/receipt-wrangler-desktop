import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-receipt-form',
  templateUrl: './receipt-form.component.html',
  styleUrls: ['./receipt-form.component.scss'],
})
export class ReceiptFormComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  public form: FormGroup = new FormGroup({});

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      amount: '',
      categories: '',
      tags: '',
      date: '',
      paidBy: '',
      isResolved: false,
    });
  }
}
