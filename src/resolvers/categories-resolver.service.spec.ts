import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ApiModule } from "../api";
import { CategoriesResolverService } from "./categories-resolver.service";

describe("CategoriesResolverService", () => {
  let service: CategoriesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule, HttpClientTestingModule],
    });
    service = TestBed.inject(CategoriesResolverService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
