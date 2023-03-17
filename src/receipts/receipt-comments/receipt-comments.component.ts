import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngxs/store';
import { take, tap } from 'rxjs';
import { CommentsService } from 'src/api/comments.service';
import { FormMode } from 'src/enums/form-mode.enum';
import { SnackbarService } from 'src/services/snackbar.service';
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
  @Output() public commentsUpdated: EventEmitter<FormArray> =
    new EventEmitter<FormArray>();

  public formMode = FormMode;

  public commentsArray: FormArray<any> = new FormArray<any>([]);

  public newCommentFormControl: FormControl = new FormControl('');

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private commentsService: CommentsService,
    private snackbarService: SnackbarService
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  public addComment(): void {
    const isValid = this.newCommentFormControl.valid;
    const newComment = {
      comment: this.newCommentFormControl.value,
      userId: Number.parseInt(this.store.selectSnapshot(AuthState.userId)),
      receiptId: this.receiptId,
    } as any;

    if (isValid && this.mode === FormMode.add) {
      this.commentsArray.push(this.buildCommentFormGroup(newComment));
      this.newCommentFormControl.reset();
      this.commentsUpdated.emit(this.commentsArray);
    } else if (isValid && this.mode === FormMode.view) {
      //make api call
      this.commentsService
        .addComment(newComment)
        .pipe(
          take(1),
          tap((comment: Comment) => {
            this.comments.push(comment);
            this.commentsArray.push(this.buildCommentFormGroup(newComment));
            this.snackbarService.success('Comment successfully added');
            this.newCommentFormControl.reset();
          })
        )
        .subscribe();
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
      userId: [
        comment?.userId ??
          Number.parseInt(this.store.selectSnapshot(AuthState.userId)),
      ],
      receiptId: [comment?.receiptId ?? this.receiptId],
    });
  }
}
