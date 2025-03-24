import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";

import { FilteredStatefulMenuComponent } from "./filtered-stateful-menu.component";

fdescribe("FilteredStatefulMenuComponent", () => {
  let component: FilteredStatefulMenuComponent;
  let fixture: ComponentFixture<FilteredStatefulMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilteredStatefulMenuComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {}
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FilteredStatefulMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
