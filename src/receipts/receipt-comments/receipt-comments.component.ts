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
import { filter, map, Observable, of, startWith, take, tap } from 'rxjs';
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

  public commentsArray: FormArray<any> = new FormArray<any>([]);

  public newCommentFormControl: FormControl = new FormControl('');

  public topLevelComments: Observable<Comment[]> = of([]);

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private commentsService: CommentsService,
    private snackbarService: SnackbarService
  ) {}

  public ngOnInit(): void {
    this.initForm();
    this.comments.forEach((c) => {
      const commentFormGroup = this.buildCommentFormGroup();
      commentFormGroup.get('commentId')?.patchValue({
        commentId: c.id,
      });
      c.replyFormGroup = commentFormGroup;
    });
    this.topLevelComments = this.commentsArray.valueChanges.pipe(
      untilDestroyed(this),
      startWith(this.commentsArray.value),
      map((c: Comment[]) => c.filter((f) => !f.commentId))
    );
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
      commentId: 0,
      replies: this.formBuilder.array([]),
      isReplyOpen: false,
    });
  }

  public replyClicked(comment: Comment): void {
    const control = this.getCommentControl(comment);
    control?.get('isReplyOpen')?.setValue(true);
    const repliesArray = control?.get('replies ') as FormArray;
    const reply = this.buildCommentFormGroup();
    reply.get('commentId')?.setValue(comment.id);

    repliesArray.push(reply);
  }

  private getCommentControl(comment: Comment): FormGroup {
    return this.commentsArray.controls.find(
      (c) => c.value === comment
    ) as FormGroup;
  }

  public replyCancelButtonClicked(comment: Comment): void {
    const control = this.getCommentControl(comment);
    control.get('isReplyOpen')?.setValue(false);
  }
}
