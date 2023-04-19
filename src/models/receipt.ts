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
  isResolved: boolean;
  resolvedDate: string;
  tags: Tag[];
  categories: Category[];
  imageFiles: FileData[];
  receiptItems: Item[];
  comments: Comment[];
}
