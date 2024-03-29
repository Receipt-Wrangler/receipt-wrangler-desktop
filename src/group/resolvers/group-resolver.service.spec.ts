import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ApiModule } from "../../open-api";
import { GroupResolverService } from "./group-resolver.service";

describe("GroupResolverService", () => {
  let service: GroupResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule, HttpClientTestingModule],
    });
    service = TestBed.inject(GroupResolverService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
