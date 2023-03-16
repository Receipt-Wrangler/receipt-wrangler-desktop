export interface Comment {
  id: number;
  comment: string;
  receiptId: number;
  userId: number;
  additionalInfo?: string;
  createdAt: Date;
  updatedAt: Date;
}
