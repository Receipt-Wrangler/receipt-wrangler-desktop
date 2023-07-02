import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngxs/store';
import { GroupState } from 'src/store/group.state';
import { UserState } from 'src/store/user.state';

@Pipe({
  name: 'bodyParser',
})
export class BodyParserPipe implements PipeTransform {
  constructor(private store: Store) {}

  public transform(body: string): string {
    let result = '';
    const groupRegex = new RegExp('\\${(.+?)}');
    result = body.replace(groupRegex, this.resolveParameterisedData.bind(this));
    return result;
  }

  public resolveParameterisedData(data: string): string {
    const cleanedData = this.trimUnnecessaryCharacters(data);
    const partsToResolve = cleanedData.split(':');
    return this.resolveData(partsToResolve);
  }

  private trimUnnecessaryCharacters(data: string): string {
    let result = data;
    const charactersToTrim = ['$', '{', '}'];

    charactersToTrim.forEach((c) => {
      result = result.replace(c, '');
    });

    return result;
  }

  private resolveData(parts: string[]): string {
    const idType = parts[0];
    const idDotKey = parts[1];

    const idKeyParts = idDotKey.split('.');
    const id = idKeyParts[0];
    const key = idKeyParts[1];

    switch (idType) {
      case 'userId':
        const user = this.store.selectSnapshot(UserState.getUserById(id));
        if (user && key) {
          return (user as any)[key];
        }
        break;
      case 'groupId':
        const group = this.store.selectSnapshot(GroupState.getGroupById(id));
        if (group && key) {
          return (group as any)[key];
        }
    }

    return '';
  }
}
