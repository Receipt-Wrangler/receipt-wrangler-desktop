import { ReadonlyValuePipe } from './readonly-value.pipe';

describe('ReadonlyValuePipe', () => {
  it('create an instance', () => {
    const pipe = new ReadonlyValuePipe();
    expect(pipe).toBeTruthy();
  });
});
