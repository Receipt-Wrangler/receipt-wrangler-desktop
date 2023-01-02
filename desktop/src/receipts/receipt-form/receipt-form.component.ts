import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Category, Tag } from 'src/models';
import { User } from 'src/models/user';
import { UserState } from 'src/store/user.state';

@Component({
  selector: 'app-receipt-form',
  templateUrl: './receipt-form.component.html',
  styleUrls: ['./receipt-form.component.scss'],
})
export class ReceiptFormComponent implements OnInit {
  @Select(UserState.users) public users!: Observable<User[]>;

  public categories: Category[] = [];
  public tags: Tag[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private acitvatedRoute: ActivatedRoute
  ) {}

  public form: FormGroup = new FormGroup({});

  public ngOnInit(): void {
    this.categories = this.acitvatedRoute.snapshot.data['categories'];
    this.tags = this.acitvatedRoute.snapshot.data['tags'];

    this.form = this.formBuilder.group({
      name: '',
      amount: '',
      categories: this.formBuilder.array([]),
      tags: this.formBuilder.array([]),
      date: new Date(),
      paidBy: '',
      isResolved: false,
    });
  }

  public paidByDisplayWith(id: number): string {
    const user = this.store.selectSnapshot(
      UserState.getUserById(id.toString())
    );

    if (user) {
      return user.displayName;
    }
    return '';
  }
}
