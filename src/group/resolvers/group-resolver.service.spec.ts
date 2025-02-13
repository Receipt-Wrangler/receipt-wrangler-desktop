import { provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ApiModule } from "../../open-api";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

describe("GroupResolverService", () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ApiModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
  });

  // TODO: write tests
  it("should be created", () => {
    expect(true);
  });
});
