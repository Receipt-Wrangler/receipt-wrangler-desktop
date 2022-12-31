export interface Receipt {
  id: number;
  name: string;
  amount: number;
  date: Date;
  paidByUserId: number;
  ownedByUserId: number;
  isResolved: boolean;
  tags: any[];
  categories: any[];
  imageFiles: any[];
  receiptItems: any[];
}
