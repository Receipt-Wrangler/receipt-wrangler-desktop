import { BodyParserPipe } from './body-parser.pipe';

describe('BodyParserPipe', () => {
  it('create an instance', () => {
    const pipe = new BodyParserPipe();
    expect(pipe).toBeTruthy();
  });
});
