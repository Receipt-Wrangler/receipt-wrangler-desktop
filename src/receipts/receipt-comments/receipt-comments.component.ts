import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { filter, map, Observable, of, pipe, startWith, take, tap } from 'rxjs';
import { CommentsService } from 'src/api/comments.service';
import { FormMode } from 'src/enums/form-mode.enum';
import { SnackbarService } from 'src/services/snackbar.service';
import { AuthState } from 'src/store/auth.state';
import { Comment } from '../../models/comment';

@UntilDestroy()
@Component({
  selector: 'app-receipt-comments',
  templateUrl: './receipt-comments.component.html',
  styleUrls: ['./receipt-comments.component.scss'],
})
export class ReceiptCommentsComponent implements OnInit {
  @Select(AuthState.userId) public loggedInUserId!: Observable<string>;
  @Input() public comments: Comment[] = [];
  @Input() public mode!: FormMode;
  @Input() public receiptId?: number;
  @Output() public commentsUpdated: EventEmitter<FormArray> =
    new EventEmitter<FormArray>();

  public formMode = FormMode;

  public commentsArray: FormArray<FormGroup> = new FormArray<FormGroup>([]);

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

  public deleteComment(index: number): void {
    const comment = this.comments[index];
    this.commentsService
      .deleteComment(comment.id.toString())
      .pipe(
        take(1),
        tap(() => {
          this.commentsArray.removeAt(index);
          this.snackbarService.success('Comment succesfully deleted');
        })
      )
      .subscribe();
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
      commentId: [comment?.commentId ?? undefined],
      replies: this.formBuilder.array([
        comment?.replies?.map((c) => this.buildCommentFormGroup(c)),
      ]),
      isReplyOpen: false,
    });
  }

  public replyClicked(comment: FormGroup, index: number): void {
    comment.get('isReplyOpen')?.setValue(true);
    const repliesArray = comment?.get('replies') as FormArray;
    const reply = this.buildCommentFormGroup();
    if (this.mode === FormMode.view) {
      reply.get('commentId')?.setValue(this.comments[index]?.id);
    }

    repliesArray.push(reply);
  }

  public replyCancelButtonClicked(comment: FormGroup): void {
    comment.get('isReplyOpen')?.setValue(false);
    const replies = comment.get('replies') as FormArray;

    replies.removeAt(replies.length - 1);
  }

  public replySaveButtonClicked(comment: FormGroup, index: number): void {
    const replies = comment.get('replies') as FormArray;
    const replyToSave = replies.at(replies.length - 1);
    const valid = replyToSave.valid;

    if (valid && this.mode === FormMode.view) {
      this.commentsService
        .addComment(replyToSave.value)
        .pipe(
          take(1),
          tap((reply: Comment) => {
            this.snackbarService.success('Reply successfully added');
            this.comments.at(index)?.replies?.push(reply);
          })
        )
        .subscribe();
    }

    comment.patchValue({
      isReplyOpen: false,
    });
  }
}
