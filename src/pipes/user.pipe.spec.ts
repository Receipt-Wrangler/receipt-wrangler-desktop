import { UserPipe } from './user.pipe';

describe('UserPipe', () => {
  it('create an instance', () => {
    const pipe = new UserPipe();
    expect(pipe).toBeTruthy();
  });
});
