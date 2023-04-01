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

  public newCommentReplyMap: { [key: number]: FormGroup } = {};

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

  public deleteComment(index: number, replyIndex?: number): void {
    const comment = this.comments[index];
    let commentIdToDelete = comment.id;
    if (replyIndex !== undefined && replyIndex >= 0) {
      commentIdToDelete = comment.replies[replyIndex].id;
    }

    this.commentsService
      .deleteComment(commentIdToDelete.toString())
      .pipe(
        take(1),
        tap(() => {
          if (replyIndex === undefined) {
            this.commentsArray.removeAt(index);
            this.comments = this.comments.filter((c) => c.id !== comment.id);
            this.snackbarService.success('Comment succesfully deleted');
          } else {
            (this.commentsArray.at(index).get('replies') as FormArray).removeAt(
              replyIndex as number
            );
            let replies: Comment[];
            if (!comment.replies) {
              replies = [];
            } else {
              replies = comment.replies;
            }

            comment.replies = replies.filter(
              (r) => r.id !== comment.replies[replyIndex as number].id
            );
            this.snackbarService.success('Reply succesfully deleted');
          }
        })
      )
      .subscribe();
  }

  private initForm(): void {
    this.comments.forEach((c) => {
      if (!c.commentId) {
        this.commentsArray.push(this.buildCommentFormGroup(c));
      }
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
      replies: this.formBuilder.array(
        comment?.replies?.map((c) => this.buildCommentFormGroup(c)) ?? []
      ),
      isReplyOpen: false,
      isViewRepliesOpen: false,
    });
  }

  public replyClicked(comment: FormGroup, index: number): void {
    const originalComment = this.comments[index];
    const newFormGroup = this.newCommentReplyMap[originalComment.id];

    if (!newFormGroup) {
      this.newCommentReplyMap[this.comments[index].id] =
        this.buildReplyFormGroup(index);
    }

    comment.patchValue({
      isReplyOpen: !comment.get('isReplyOpen')?.value,
    });
  }

  public viewRepliesClicked(comment: FormGroup): void {
    const isViewRepliesOpen = comment.value.isViewRepliesOpen;
    comment.get('isViewRepliesOpen')?.setValue(!isViewRepliesOpen);
  }

  public replyCancelButtonClicked(comment: FormGroup): void {
    comment.get('isReplyOpen')?.setValue(false);
  }

  public replySaveButtonClicked(comment: FormGroup, index: number): void {
    const replyFormGroup = this.newCommentReplyMap[this.comments[index].id];

    if (replyFormGroup.valid && this.mode === FormMode.view) {
      this.commentsService
        .addComment(replyFormGroup.value)
        .pipe(
          take(1),
          tap((reply: Comment) => {
            this.snackbarService.success('Reply successfully added');

            this.comments.at(index)?.replies?.push(reply);
            (comment.get('replies') as FormArray).push(
              this.buildReplyFormGroup(index, reply)
            );

            replyFormGroup.patchValue({
              comment: '',
            });
            replyFormGroup.markAsPristine();
            replyFormGroup.markAsUntouched();
          })
        )
        .subscribe();
    }

    comment.patchValue({
      isReplyOpen: false,
    });
  }

  private buildReplyFormGroup(index: number, reply?: Comment): FormGroup {
    const originalParentComment = this.comments[index];

    let formGroup: FormGroup;
    if (reply) {
      formGroup = this.buildCommentFormGroup(reply);
    } else {
      formGroup = this.buildCommentFormGroup();
    }

    formGroup.patchValue({
      commentId: originalParentComment.id,
    });

    return formGroup;
  }
}
