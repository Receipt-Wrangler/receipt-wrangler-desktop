import { Pipe, PipeTransform } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Pipe({
  name: 'topLevelComment',
  pure: false,
})
export class TopLevelCommentPipe implements PipeTransform {
  transform(comments: FormArray<FormGroup>): FormGroup[] {
    return comments.controls.filter((c) => c.get('commentId')?.value === null);
  }
}
