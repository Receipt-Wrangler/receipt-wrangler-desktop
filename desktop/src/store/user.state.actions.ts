import { User } from 'src/models/user';

export class SetUsers {
  static readonly type = '[User] Set Users';
  constructor(public users: User[]) {}
}
