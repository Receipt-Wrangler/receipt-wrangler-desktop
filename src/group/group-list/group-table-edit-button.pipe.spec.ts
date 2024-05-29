import { TestBed } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { Group } from "../../open-api";
import { AuthState, GroupState } from "../../store";
import { GroupTableEditButtonPipe } from "./group-table-edit-button.pipe";

describe("GroupTableEditButtonPipe", () => {
  let pipe: GroupTableEditButtonPipe;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupTableEditButtonPipe],
      imports: [NgxsModule.forRoot([GroupState, AuthState])],
      providers: [GroupTableEditButtonPipe],
    }).compileComponents();

    pipe = TestBed.inject(GroupTableEditButtonPipe);
    store = TestBed.inject(Store);
  });

  it("create an instance", () => {
    expect(pipe).toBeTruthy();
  });

  it("should return details edit link and tab details when user is admin and in group", () => {
    const group: Group = {
      id: 1,
      groupMembers: [{ userId: 1 } as any]
    } as any;
    spyOn(store, "selectSnapshot").and.returnValue("1");
    const result = pipe.transform(group, true);
    expect(result.routerLink).toEqual(["/groups/1/details/edit"]);
    expect(result.queryParams).toEqual({ tab: "details" });
  });

  it("should return settings edit link and tab settings when user is not admin or not in group", () => {
    const group: Group = {
      id: "1",
      groupMembers: [{ userId: "2" }]
    } as any;
    spyOn(store, "selectSnapshot").and.returnValue("1");
    const result = pipe.transform(group, false);
    expect(result.routerLink).toEqual(["/groups/1/settings/edit"]);
    expect(result.queryParams).toEqual({ tab: "settings" });
  });
});
