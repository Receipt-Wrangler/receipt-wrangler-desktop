export interface ReceiptFileUploadCommand {
  file: File;
  receiptId: number;
  encodedImage?: string;
}
