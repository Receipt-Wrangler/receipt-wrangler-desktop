import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ReplyButtonTextPipe } from './reply-button-text.pipe';

describe('ReplyButtonTextPipe', () => {
  it('create an instance', () => {
    const pipe = new ReplyButtonTextPipe();
    expect(pipe).toBeTruthy();
  });

  it('return view 1 reply', () => {
    const pipe = new ReplyButtonTextPipe();
    const comment = new FormGroup({
      replies: new FormArray([
        new FormGroup({})
      ]),
      isViewRepliesOpen: new FormControl(false)
    })
    
    const result = pipe.transform(comment);

    expect(result).toEqual("View 1 Reply")
  });

  it('return hide 1 reply', () => {
    const pipe = new ReplyButtonTextPipe();
    const comment = new FormGroup({
      replies: new FormArray([
        new FormGroup({})
      ]),
      isViewRepliesOpen: new FormControl(true)
    })
    
    const result = pipe.transform(comment);

    expect(result).toEqual("Hide 1 Reply")
  });

  it('return view 2 replies', () => {
    const pipe = new ReplyButtonTextPipe();
    const comment = new FormGroup({
      replies: new FormArray([
        new FormGroup({}),
        new FormGroup({})
      ]),
      isViewRepliesOpen: new FormControl(false)
    })
    
    const result = pipe.transform(comment);

    expect(result).toEqual("View 2 Replies")
  });

  it('return hide 2 replies', () => {
    const pipe = new ReplyButtonTextPipe();
    const comment = new FormGroup({
      replies: new FormArray([
        new FormGroup({}),
        new FormGroup({})
      ]),
      isViewRepliesOpen: new FormControl(true)
    })
    
    const result = pipe.transform(comment);

    expect(result).toEqual("Hide 2 Replies")
  });
});
