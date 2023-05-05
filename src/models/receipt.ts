import { ReceiptStatus } from 'src/enums/receipt-status.enum';
import { Category } from './category';
import { Comment } from './comment';
import { FileData } from './file-data';
import { Item } from './item';
import { Tag } from './tag';

export interface Receipt {
  id: number;
  name: string;
  amount: number;
  date: string;
  paidByUserId: number;
  groupId: number;
  status: ReceiptStatus;
  resolvedDate: string;
  tags: Tag[];
  categories: Category[];
  imageFiles: FileData[];
  receiptItems: Item[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}
