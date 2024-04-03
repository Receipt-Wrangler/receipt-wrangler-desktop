import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ResolveFn } from "@angular/router";
import { ApiModule, Category, CategoryService } from "../open-api";
import { categoryResolverFn } from "./categories.resolver";

describe("CategoriesResolverService", () => {
  const executeResolver: ResolveFn<Category[]> = (
    ...resolverParameters
  ) =>
    TestBed.runInInjectionContext(() =>
      categoryResolverFn(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiModule, HttpClientTestingModule],
    });
  });

  it("should call get all categories", () => {
    const serviceSpy = spyOn(TestBed.inject(CategoryService), "getAllCategories");
    executeResolver({} as any, {} as any);
    expect(serviceSpy).toHaveBeenCalled();
  });
});
