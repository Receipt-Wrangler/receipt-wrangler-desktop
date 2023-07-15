import { Category, Tag } from 'src/api-new';
import { ReceiptStatus } from 'src/enums/receipt-status.enum';
import { Comment } from './comment';
import { FileData } from './file-data';
import { Item } from './item';

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
  createdBy: number;
}
