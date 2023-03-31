import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Pipe({
  name: 'replyButtonText',
  pure: false,
})
export class ReplyButtonTextPipe implements PipeTransform {
  transform(comment: FormGroup): string {
    const length = comment.value?.replies?.length;
    const actionWord = comment.value.isViewRepliesOpen ? 'Hide' : 'View';

    if (length === 1) {
      return `${actionWord} ${length} Reply`;
    } else {
      return `${actionWord} ${length} Replies`;
    }
  }
}
