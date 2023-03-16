import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngxs/store';
import { FormMode } from 'src/enums/form-mode.enum';
import { AuthState } from 'src/store/auth.state';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-receipt-comments',
  templateUrl: './receipt-comments.component.html',
  styleUrls: ['./receipt-comments.component.scss'],
})
export class ReceiptCommentsComponent implements OnInit {
  @Input() public comments: Comment[] = [];
  @Input() public mode!: FormMode;
  @Input() public receiptId?: number;

  public formMode = FormMode;

  public commentsArray: FormArray<any> = new FormArray<any>([]);

  public newCommentFormControl: FormControl = new FormControl(
    '',
    Validators.required
  );

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  public ngOnInit(): void {
    this.initForm();
  }

  public addComment(): void {
    if (this.newCommentFormControl.valid) {
      const newComment = {
        comment: this.newCommentFormControl.value,
        userId: this.store.selectSnapshot(AuthState.userId),
        receiptId: this.receiptId,
      } as any;
      this.commentsArray.push(this.buildCommentFormGroup(newComment));
      this.newCommentFormControl.reset();
    }
  }

  private initForm(): void {
    this.comments.forEach((c) => {
      this.commentsArray.push(this.buildCommentFormGroup(c));
    });
  }

  private buildCommentFormGroup(comment?: Comment): FormGroup {
    return this.formBuilder.group({
      comment: [comment?.comment ?? '', Validators.required],
      userId: [comment?.userId ?? this.store.selectSnapshot(AuthState.userId)],
      receiptId: [comment?.receiptId ?? this.receiptId],
    });
  }
}
