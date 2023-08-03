import { Receipt } from '@receipt-wrangler/receipt-wrangler-core';

import { StatusPipe } from './status.pipe';

describe('StatusPipe', () => {
  it('create an instance', () => {
    const pipe = new StatusPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return Open', () => {
    const pipe = new StatusPipe();
    const result = pipe.transform(Receipt.StatusEnum.OPEN);

    expect(result).toEqual('Open');
  });

  it('should return Needs Attention', () => {
    const pipe = new StatusPipe();
    const result = pipe.transform(Receipt.StatusEnum.NEEDSATTENTION);

    expect(result).toEqual('Needs Attention');
  });

  it('should return Resolved', () => {
    const pipe = new StatusPipe();
    const result = pipe.transform(Receipt.StatusEnum.RESOLVED);

    expect(result).toEqual('Resolved');
  });

  it('should return the input string', () => {
    const pipe = new StatusPipe();
    const result = pipe.transform('I am a bad status');

    expect(result).toEqual('I am a bad status');
  });
});
