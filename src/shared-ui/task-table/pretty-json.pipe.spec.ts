import {PrettyJsonPipe} from './pretty-json.pipe';
import {TestBed} from "@angular/core/testing";

describe('PrettyJsonPipe', () => {
  let pipe: PrettyJsonPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrettyJsonPipe],
      imports: [],
      providers: [PrettyJsonPipe]
    });

    pipe = TestBed.inject(PrettyJsonPipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
