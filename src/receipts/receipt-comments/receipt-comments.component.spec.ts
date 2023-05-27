import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptCommentsComponent } from './receipt-comments.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule, Store } from '@ngxs/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PipesModule } from 'src/pipes/pipes.module';
import { TopLevelCommentPipe } from './top-level-comment.pipe';
import { Comment } from '../../models';
import { AuthState } from 'src/store/auth.state';

describe('ReceiptCommentsComponent', () => {
  let component: ReceiptCommentsComponent;
  let fixture: ComponentFixture<ReceiptCommentsComponent>;
  let comments: Comment[];
  let store: Store;

  beforeEach(async () => {
    comments = [
      {
        id: 1,
        comment: 'comment',
        receiptId: 1,
        userId: 1,
        replies: [],
        updatedAt: '',
        createdAt: '',
      },
      {
        id: 2,
        comment: 'new comment',
        receiptId: 1,
        userId: 1,
        replies: [
          {
            id: 3,
            comment: 'reply',
            receiptId: 1,
            userId: 1,
            replies: [],
            commentId: 2,
            updatedAt: '',
            createdAt: '',
          },
        ],
        updatedAt: '',
        createdAt: '',
      },
    ];

    await TestBed.configureTestingModule({
      declarations: [ReceiptCommentsComponent, TopLevelCommentPipe],
      imports: [
        ReactiveFormsModule,
        NgxsModule.forRoot([AuthState]),
        HttpClientTestingModule,
        MatSnackBarModule,
        PipesModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(ReceiptCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init each comment correctly', () => {
    component.comments = comments;

    component.ngOnInit();
    expect(component.commentsArray.value).toEqual([
      {
        comment: 'comment',
        userId: 1,
        receiptId: 1,
        commentId: null,
        replies: [],
        isReplyOpen: false,
        isViewRepliesOpen: false,
      },
      {
        comment: 'new comment',
        userId: 1,
        receiptId: 1,
        commentId: null,
        replies: [
          {
            comment: 'reply',
            userId: 1,
            receiptId: 1,
            commentId: 2,
            replies: [],
            isReplyOpen: false,
            isViewRepliesOpen: false,
          },
        ],
        isReplyOpen: false,
        isViewRepliesOpen: false,
      },
    ]);
  });

  it('should open reply and create form group in map', () => {
    store.reset({
      auth: {
        userId: 1,
      },
    });
    component.comments = comments;
    component.receiptId = 1;

    expect(component.newCommentReplyMap[1]).toBeFalsy();
    component.ngOnInit();

    component.replyClicked(component.commentsArray.at(0), 0);

    expect(component.newCommentReplyMap[1].value).toEqual({
      comment: '',
      userId: 1,
      receiptId: 1,
      commentId: 1,
      replies: [],
      isReplyOpen: false,
      isViewRepliesOpen: false,
    });
    expect(component.commentsArray.at(0).get('isReplyOpen')?.value).toEqual(
      true
    );
  });

  it('toggle view replies', () => {
    component.comments = comments;
    component.ngOnInit();
    const commentsArray = component.commentsArray;

    expect(commentsArray.at(0).get('isViewRepliesOpen')?.value).toEqual(false);
    component.viewRepliesClicked(commentsArray.at(0));

    expect(commentsArray.at(0).get('isViewRepliesOpen')?.value).toEqual(true);
  });

  it('set isReplyOpen to false', () => {
    component.comments = comments;
    component.ngOnInit();
    const commentsArray = component.commentsArray;

    commentsArray.at(0).patchValue({
      isReplyOpen: true,
    });

    expect(commentsArray.at(0).get('isReplyOpen')?.value).toEqual(true);
    component.replyCancelButtonClicked(commentsArray.at(0));

    expect(commentsArray.at(0).get('isReplyOpen')?.value).toEqual(false);
  });
});
