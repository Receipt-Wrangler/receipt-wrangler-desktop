import { FormControl, FormGroup } from '@angular/forms';

export interface Comment {
  id: number;
  comment: string;
  receiptId: number;
  userId: number;
  replies: Comment[];
  additionalInfo?: string;
  commentId?: number;
  createdAt: Date;
  updatedAt: Date;
}
