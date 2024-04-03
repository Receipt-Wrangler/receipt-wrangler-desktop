import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ResolveFn } from "@angular/router";
import { ApiModule, Tag, TagService } from "../open-api";
import { tagResolverFn } from "./tags.resolver";

describe("TagsResolverService", () => {
  const executeResolver: ResolveFn<Tag[]> = (
    ...resolverParameters
  ) =>
    TestBed.runInInjectionContext(() =>
      tagResolverFn(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule, HttpClientTestingModule],
    });
  });

  it("should call tag service", () => {
    const serviceSpy = spyOn(TestBed.inject(TagService), "getAllTags");
    executeResolver({} as any, {} as any);
    expect(serviceSpy).toHaveBeenCalled();
  });
});
