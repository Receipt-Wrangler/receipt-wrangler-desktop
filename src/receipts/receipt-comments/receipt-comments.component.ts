import { Component, Input } from '@angular/core';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-receipt-comments',
  templateUrl: './receipt-comments.component.html',
  styleUrls: ['./receipt-comments.component.scss'],
})
export class ReceiptCommentsComponent {
  @Input() public comments: Comment[] = [];
}
