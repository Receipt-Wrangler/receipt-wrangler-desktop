import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'optionDisplay',
})
export class OptionDisplayPipe implements PipeTransform {
  public transform(
    option: any,
    options: any[],
    optionDisplayKey?: string,
    optionValueKey?: string
  ): any {
    if (optionValueKey && optionDisplayKey) {
      return options.find(
        (o) => o?.[optionValueKey] === (option?.[optionValueKey] ?? option)
      )[optionDisplayKey];
    }

    if (optionDisplayKey) {
      return option[optionDisplayKey];
    }

    return option;
  }
}
