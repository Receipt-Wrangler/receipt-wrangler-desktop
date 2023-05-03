import { ReceiptStatus } from 'src/enums/receipt-status.enum';
import { StatusPipe } from './status.pipe';

describe('StatusPipe', () => {
  it('create an instance', () => {
    const pipe = new StatusPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return Open', () => {
    const pipe = new StatusPipe();
    const result = pipe.transform(ReceiptStatus.OPEN)

    expect(result).toEqual("Open");
  });

  it('should return Needs Attention', () => {
    const pipe = new StatusPipe();
    const result = pipe.transform(ReceiptStatus.NEEDS_ATTENTION)

    expect(result).toEqual("Needs Attention");
  });

  it('should return Resolved', () => {
    const pipe = new StatusPipe();
    const result = pipe.transform(ReceiptStatus.RESOLVED)

    expect(result).toEqual("Resolved");
  });

  it('should return the input string', () => {
    const pipe = new StatusPipe();
    const result = pipe.transform("I am a bad status")

    expect(result).toEqual("I am a bad status");
  });
});
