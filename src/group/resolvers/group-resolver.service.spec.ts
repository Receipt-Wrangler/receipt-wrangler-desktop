import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ApiModule } from "../../open-api";

describe("GroupResolverService", () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule, HttpClientTestingModule],
    });
  });

  // TODO: write tests
  it("should be created", () => {
    expect(true);
  });
});
