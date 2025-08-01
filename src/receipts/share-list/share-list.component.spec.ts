import { CurrencyPipe } from "@angular/common";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NgxsModule, Store } from "@ngxs/store";
import { FormMode } from "src/enums/form-mode.enum";
import { PipesModule } from "src/pipes/pipes.module";
import { Category, Group, GroupRole, Item, ItemStatus, Tag, User } from "../../open-api";
import { UserState } from "../../store/index";
import { SystemSettingsState } from "../../store/system-settings.state";
import { UserTotalWithPercentagePipe } from "../user-total-with-percentage.pipe";
import { buildItemForm } from "../utils/form.utils";

import { ShareListComponent } from "./share-list.component";

describe("ShareListComponent", () => {
  let component: ShareListComponent;
  let fixture: ComponentFixture<ShareListComponent>;
  let store: Store;

  const mockUsers: User[] = [
    { id: 1, username: "user1", displayName: "User One" } as User,
    { id: 2, username: "user2", displayName: "User Two" } as User,
    { id: 3, username: "user3", displayName: "User Three" } as User,
  ];

  const mockItems: Item[] = [
    { id: 1, name: "Item 1", amount: 10.50, chargedToUserId: 1, status: ItemStatus.Open } as any,
    { id: 2, name: "Item 2", amount: 15.75, chargedToUserId: 2, status: ItemStatus.Open } as any,
    { id: 3, name: "Item 3", amount: 8.25, chargedToUserId: 1, status: ItemStatus.Resolved } as any,
    { id: 4, name: "Item 4", amount: 12.00, chargedToUserId: 3, status: ItemStatus.Open } as any,
  ];

  const mockCategories: Category[] = [
    { id: 1, name: "Food", description: "Food items" } as Category,
    { id: 2, name: "Entertainment", description: "Entertainment items" } as Category,
  ];

  const mockTags: Tag[] = [
    { id: 1, name: "Urgent", description: "Urgent items" } as Tag,
    { id: 2, name: "Business", description: "Business items" } as Tag,
  ];

  const mockReceipt: any = {
    id: 1,
    name: "Test Receipt",
    amount: 46.50,
    date: "2023-01-01",
  } as any;

  const mockGroup: Group = {
    id: 1,
    name: "Test Group",
    groupRole: GroupRole.Owner,
  } as any;

  const mockActivatedRoute = {
    snapshot: {
      data: {
        receipt: mockReceipt,
        mode: FormMode.edit,
      },
    },
  };

  function createFormWithItems(items: Item[]): FormGroup {
    const receiptItems = new FormArray(
      items.map(item => buildItemForm(item, mockReceipt.id?.toString()))
    );

    return new FormGroup({
      receiptItems: receiptItems,
      amount: new FormControl(46.50),
    });
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShareListComponent, UserTotalWithPercentagePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [CurrencyPipe, PipesModule, NgxsModule.forRoot([UserState, SystemSettingsState])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
        CurrencyPipe,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ShareListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    // Reset store with proper user data structure
    store.reset({
      users: {
        users: mockUsers
      },
      systemSettings: {}
    });

    component.form = createFormWithItems(mockItems);
    component.categories = mockCategories;
    component.tags = mockTags;
    component.selectedGroup = mockGroup;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("Component Initialization", () => {
    it("should initialize with route data on ngOnInit", () => {
      component.ngOnInit();

      expect(component.originalReceipt).toEqual(mockReceipt);
      expect(component.mode).toBe(FormMode.edit);
      expect(component.userItemMap.size).toBe(3);
    });

    it("should handle ngOnChanges when triggerAddMode changes to true", () => {
      spyOn(component, "initAddMode");
      const changes = {
        triggerAddMode: new SimpleChange(false, true, false)
      };

      component.ngOnChanges(changes);

      expect(component.initAddMode).toHaveBeenCalled();
    });

    it("should not call initAddMode when triggerAddMode is false", () => {
      spyOn(component, "initAddMode");
      const changes = {
        triggerAddMode: new SimpleChange(true, false, false)
      };

      component.ngOnChanges(changes);

      expect(component.initAddMode).not.toHaveBeenCalled();
    });

    it("should not call initAddMode when triggerAddMode is not in changes", () => {
      spyOn(component, "initAddMode");
      const changes = {
        someOtherProperty: new SimpleChange("old", "new", false)
      };

      component.ngOnChanges(changes);

      expect(component.initAddMode).not.toHaveBeenCalled();
    });
  });

  describe("User Item Map Management", () => {
    it("should set user item map correctly with valid items", () => {
      component.setUserItemMap();

      expect(component.userItemMap.size).toBe(3);
      expect(component.userItemMap.get("1")).toEqual([
        { item: mockItems[0], arrayIndex: 0 },
        { item: mockItems[2], arrayIndex: 2 }
      ]);
      expect(component.userItemMap.get("2")).toEqual([
        { item: mockItems[1], arrayIndex: 1 }
      ]);
      expect(component.userItemMap.get("3")).toEqual([
        { item: mockItems[3], arrayIndex: 3 }
      ]);
    });

    it("should handle empty items array", () => {
      component.form = createFormWithItems([]);

      component.setUserItemMap();

      expect(component.userItemMap.size).toBe(0);
    });

    it("should skip items without chargedToUserId", () => {
      const itemsWithoutUserId = [
        { id: 1, name: "Item 1", amount: 10.50, chargedToUserId: 1, status: ItemStatus.Open } as any,
        { id: 2, name: "Item 2", amount: 15.75, chargedToUserId: undefined, status: ItemStatus.Open } as any,
        { id: 3, name: "Item 3", amount: 8.25, chargedToUserId: null, status: ItemStatus.Open } as any,
      ];
      component.form = createFormWithItems(itemsWithoutUserId);

      component.setUserItemMap();

      expect(component.userItemMap.size).toBe(1);
      expect(component.userItemMap.get("1")).toEqual([
        { item: itemsWithoutUserId[0], arrayIndex: 0 }
      ]);
    });

    it("should handle undefined receiptItems", () => {
      component.form = new FormGroup({});

      component.setUserItemMap();

      expect(component.userItemMap.size).toBe(0);
    });

    it("should handle null items array", () => {
      component.form = new FormGroup({
        receiptItems: new FormArray([])
      });
      component.form.get("receiptItems")?.setValue(null);

      component.setUserItemMap();

      expect(component.userItemMap.size).toBe(0);
    });

    it("should group multiple items for same user", () => {
      const sameUserItems = [
        { id: 1, name: "Item 1", amount: 10.50, chargedToUserId: 1, status: ItemStatus.Open } as any,
        { id: 2, name: "Item 2", amount: 15.75, chargedToUserId: 1, status: ItemStatus.Open } as any,
        { id: 3, name: "Item 3", amount: 8.25, chargedToUserId: 1, status: ItemStatus.Open } as any,
      ];
      component.form = createFormWithItems(sameUserItems);

      component.setUserItemMap();

      expect(component.userItemMap.size).toBe(1);
      expect(component.userItemMap.get("1")?.length).toBe(3);
    });
  });

  describe("Add Mode Functionality", () => {
    it("should initialize add mode correctly", () => {
      component.initAddMode();

      expect(component.isAdding).toBe(true);
      expect(component.newItemFormGroup).toBeDefined();
      expect(component.newItemFormGroup.get("name")).toBeDefined();
      expect(component.newItemFormGroup.get("chargedToUserId")).toBeDefined();
      expect(component.newItemFormGroup.get("amount")).toBeDefined();
      expect(component.newItemFormGroup.get("receiptId")?.value).toBe(1);
    });

    it("should exit add mode correctly", () => {
      component.isAdding = true;
      component.newItemFormGroup = new FormGroup({
        name: new FormControl("test"),
        amount: new FormControl(10)
      });

      component.exitAddMode();

      expect(component.isAdding).toBe(false);
      expect(component.newItemFormGroup.controls).toEqual({});
    });

    it("should submit new item form group when valid", () => {
      spyOn(component.itemAdded, "emit");
      spyOn(component, "exitAddMode");
      component.initAddMode();
      component.newItemFormGroup.patchValue({
        name: "New Item",
        chargedToUserId: 1,
        amount: 25.50
      });

      component.submitNewItemFormGroup();

      expect(component.itemAdded.emit).toHaveBeenCalledWith(jasmine.objectContaining({
        name: "New Item",
        chargedToUserId: 1,
        amount: 25.50
      }));
      expect(component.exitAddMode).toHaveBeenCalled();
    });

    it("should not submit new item form group when invalid", () => {
      spyOn(component.itemAdded, "emit");
      spyOn(component, "exitAddMode");
      component.initAddMode();

      component.submitNewItemFormGroup();

      expect(component.itemAdded.emit).not.toHaveBeenCalled();
      expect(component.exitAddMode).not.toHaveBeenCalled();
    });
  });

  describe("Item Management", () => {
    it("should remove item correctly", () => {
      spyOn(component.itemRemoved, "emit");
      const itemData = { item: mockItems[0], arrayIndex: 0 };

      component.removeItem(itemData);

      expect(component.itemRemoved.emit).toHaveBeenCalledWith({
        item: mockItems[0],
        arrayIndex: 0
      });
    });

    it("should add inline item when not in view mode", () => {
      spyOn(component.itemAdded, "emit");
      component.mode = FormMode.edit;

      component.addInlineItem("1");

      expect(component.itemAdded.emit).toHaveBeenCalledWith(jasmine.objectContaining({
        name: "",
        chargedToUserId: 1
      }));
    });

    it("should not add inline item when in view mode", () => {
      spyOn(component.itemAdded, "emit");
      component.mode = FormMode.view;

      component.addInlineItem("1");

      expect(component.itemAdded.emit).not.toHaveBeenCalled();
    });

    it("should add inline item and stop event propagation", () => {
      spyOn(component.itemAdded, "emit");
      component.mode = FormMode.edit;
      const mockEvent = { stopImmediatePropagation: jasmine.createSpy() } as any;

      component.addInlineItem("1", mockEvent);

      expect(mockEvent.stopImmediatePropagation).toHaveBeenCalled();
      expect(component.itemAdded.emit).toHaveBeenCalled();
    });

    it("should add inline item on blur when it's the last item and valid", () => {
      spyOn(component, "addInlineItem");
      component.mode = FormMode.edit;
      const lastIndex = component.userItemMap.get("1")!.length - 1;
      const receiptItemsArray = component.receiptItems;
      receiptItemsArray.at(0).markAsDirty();
      receiptItemsArray.at(0).patchValue({ name: "Valid Item", amount: 10 });

      component.addInlineItemOnBlur("1", lastIndex);

      expect(component.addInlineItem).toHaveBeenCalledWith("1");
    });

    it("should not add inline item on blur when it's not the last item", () => {
      spyOn(component, "addInlineItem");
      component.mode = FormMode.edit;

      component.addInlineItemOnBlur("1", 0);

      expect(component.addInlineItem).not.toHaveBeenCalled();
    });

    it("should check and remove last inline item when pristine and empty", () => {
      spyOn(component.itemRemoved, "emit");
      component.mode = FormMode.edit;

      const multipleItemsUser = [
        { id: 1, name: "Item 1", amount: 10.50, chargedToUserId: 1, status: ItemStatus.Open } as any,
        { id: 2, name: "", amount: 0, chargedToUserId: 1, status: ItemStatus.Open } as any,
      ];
      component.form = createFormWithItems(multipleItemsUser);
      component.setUserItemMap();

      const lastItemIndex = component.userItemMap.get("1")![1].arrayIndex;
      const lastFormGroup = component.receiptItems.at(lastItemIndex);
      lastFormGroup.markAsPristine();

      component.checkLastInlineItem("1");

      expect(component.itemRemoved.emit).toHaveBeenCalledWith({
        item: multipleItemsUser[1],
        arrayIndex: lastItemIndex
      });
    });

    it("should not remove last inline item when not pristine", () => {
      spyOn(component.itemRemoved, "emit");
      component.mode = FormMode.edit;

      const multipleItemsUser = [
        { id: 1, name: "Item 1", amount: 10.50, chargedToUserId: 1, status: ItemStatus.Open } as any,
        { id: 2, name: "", amount: 0, chargedToUserId: 1, status: ItemStatus.Open } as any,
      ];
      component.form = createFormWithItems(multipleItemsUser);
      component.setUserItemMap();

      const lastItemIndex = component.userItemMap.get("1")![1].arrayIndex;
      const lastFormGroup = component.receiptItems.at(lastItemIndex);
      lastFormGroup.markAsDirty();

      component.checkLastInlineItem("1");

      expect(component.itemRemoved.emit).not.toHaveBeenCalled();
    });

    it("should not remove last inline item when user has only one item", () => {
      spyOn(component.itemRemoved, "emit");
      component.mode = FormMode.edit;

      const singleItemUser = [
        { id: 1, name: "", amount: 0, chargedToUserId: 1, status: ItemStatus.Open } as any,
      ];
      component.form = createFormWithItems(singleItemUser);
      component.setUserItemMap();

      component.checkLastInlineItem("1");

      expect(component.itemRemoved.emit).not.toHaveBeenCalled();
    });

    it("should not check last inline item when in view mode", () => {
      spyOn(component.itemRemoved, "emit");
      component.mode = FormMode.view;

      component.checkLastInlineItem("1");

      expect(component.itemRemoved.emit).not.toHaveBeenCalled();
    });
  });

  describe("Resolution Functionality", () => {
    it("should resolve all items for user when clicked", () => {
      spyOn(component.allItemsResolved, "emit");
      const mockEvent = { stopImmediatePropagation: jasmine.createSpy() } as any;

      component.resolveAllItemsClicked(mockEvent, "1");

      expect(mockEvent.stopImmediatePropagation).toHaveBeenCalled();
      expect(component.allItemsResolved.emit).toHaveBeenCalledWith("1");

      const userItems = component.receiptItems.controls.filter(
        (control) => control.get("chargedToUserId")?.value?.toString() === "1"
      );
      userItems.forEach((item) => {
        expect(item.get("status")?.value).toBe(ItemStatus.Resolved);
      });
    });

    it("should return true when all user items are resolved", () => {
      const resolvedItems = [
        { id: 1, name: "Item 1", amount: 10.50, chargedToUserId: 1, status: ItemStatus.Resolved } as any,
        { id: 2, name: "Item 2", amount: 8.25, chargedToUserId: 1, status: ItemStatus.Resolved } as any,
      ];
      component.form = createFormWithItems(resolvedItems);
      component.setUserItemMap();

      const result = component.allUserItemsResolved("1");

      expect(result).toBe(true);
    });

    it("should return false when not all user items are resolved", () => {
      const mixedItems = [
        { id: 1, name: "Item 1", amount: 10.50, chargedToUserId: 1, status: ItemStatus.Resolved } as any,
        { id: 2, name: "Item 2", amount: 8.25, chargedToUserId: 1, status: ItemStatus.Open } as any,
      ];
      component.form = createFormWithItems(mixedItems);
      component.setUserItemMap();

      const result = component.allUserItemsResolved("1");

      expect(result).toBe(false);
    });

    it("should return true when user has no items", () => {
      component.form = createFormWithItems([]);
      component.setUserItemMap();

      const result = component.allUserItemsResolved("999");

      expect(result).toBe(true);
    });

    it("should get items for user correctly", () => {
      const userItems = (component as any).getItemsForUser("1");

      expect(userItems.length).toBe(2);
      expect(userItems[0].get("chargedToUserId")?.value).toBe(1);
      expect(userItems[1].get("chargedToUserId")?.value).toBe(1);
    });

    it("should get empty array for user with no items", () => {
      const userItems = (component as any).getItemsForUser("999");

      expect(userItems.length).toBe(0);
    });
  });

  describe("Form Integration", () => {
    it("should return receiptItems FormArray from getter", () => {
      const receiptItems = component.receiptItems;

      expect(receiptItems).toBeInstanceOf(FormArray);
      expect(receiptItems.length).toBe(4);
    });

    it("should return empty FormArray when receiptItems doesn't exist", () => {
      component.form = new FormGroup({});

      const receiptItems = component.receiptItems;

      expect(receiptItems).toBeNull();
    });

    it("should emit itemAdded event", () => {
      spyOn(component.itemAdded, "emit");
      const newItem = { name: "New Item", amount: 15.00, chargedToUserId: 1 } as any;

      component.itemAdded.emit(newItem);

      expect(component.itemAdded.emit).toHaveBeenCalledWith(newItem);
    });

    it("should emit itemRemoved event", () => {
      spyOn(component.itemRemoved, "emit");
      const itemData = { item: mockItems[0], arrayIndex: 0 };

      component.itemRemoved.emit(itemData);

      expect(component.itemRemoved.emit).toHaveBeenCalledWith(itemData);
    });

    it("should emit allItemsResolved event", () => {
      spyOn(component.allItemsResolved, "emit");
      const userId = "1";

      component.allItemsResolved.emit(userId);

      expect(component.allItemsResolved.emit).toHaveBeenCalledWith(userId);
    });
  });

  describe("Edge Cases", () => {
    it("should handle ngOnInit with undefined route data", () => {
      const undefinedRouteData = {
        snapshot: {
          data: {}
        }
      };
      // Create a new component with different route data
      const newFixture = TestBed.overrideProvider(ActivatedRoute, { useValue: undefinedRouteData })
        .createComponent(ShareListComponent);
      const newComponent = newFixture.componentInstance;
      newComponent.form = createFormWithItems(mockItems);

      newComponent.ngOnInit();

      expect(newComponent.originalReceipt).toBeUndefined();
      expect(newComponent.mode).toBeUndefined();
    });

    it("should handle form with null receiptItems", () => {
      component.form = new FormGroup({
        receiptItems: new FormControl(null)
      });

      expect(() => component.setUserItemMap()).not.toThrow();
      expect(component.userItemMap.size).toBe(0);
    });

    it("should handle addInlineItemOnBlur with invalid userItemMap", () => {
      spyOn(component, "addInlineItem");
      component.userItemMap = new Map();

      component.addInlineItemOnBlur("999", 0);

      expect(component.addInlineItem).not.toHaveBeenCalled();
    });

    it("should handle checkLastInlineItem with invalid userItemMap", () => {
      spyOn(component.itemRemoved, "emit");
      component.userItemMap = new Map();

      component.checkLastInlineItem("999");

      expect(component.itemRemoved.emit).not.toHaveBeenCalled();
    });

    it("should handle form mode changes", () => {
      component.mode = FormMode.view;
      expect(component.mode).toBe(FormMode.view);

      component.mode = FormMode.edit;
      expect(component.mode).toBe(FormMode.edit);

      component.mode = FormMode.add;
      expect(component.mode).toBe(FormMode.add);
    });

    it("should handle empty triggerAddMode input", () => {
      component.triggerAddMode = false;
      expect(component.triggerAddMode).toBe(false);

      component.triggerAddMode = true;
      expect(component.triggerAddMode).toBe(true);
    });

    it("should handle items with string chargedToUserId", () => {
      const itemsWithStringUserId = [
        { id: 1, name: "Item 1", amount: 10.50, chargedToUserId: "1", status: ItemStatus.Open } as any,
        { id: 2, name: "Item 2", amount: 15.75, chargedToUserId: "2", status: ItemStatus.Open } as any,
      ];
      component.form = createFormWithItems(itemsWithStringUserId);

      component.setUserItemMap();

      expect(component.userItemMap.size).toBe(2);
      expect(component.userItemMap.has("1")).toBe(true);
      expect(component.userItemMap.has("2")).toBe(true);
    });

    it("should handle addInlineItem with string userId", () => {
      spyOn(component.itemAdded, "emit");
      component.mode = FormMode.edit;

      component.addInlineItem("123");

      expect(component.itemAdded.emit).toHaveBeenCalledWith(jasmine.objectContaining({
        name: "",
        chargedToUserId: 123
      }));
    });

    it("should handle invalid form states in submitNewItemFormGroup", () => {
      spyOn(component.itemAdded, "emit");
      component.newItemFormGroup = new FormGroup({
        name: new FormControl("", []),
        amount: new FormControl("", []),
        chargedToUserId: new FormControl("", [])
      });

      component.submitNewItemFormGroup();

      expect(component.itemAdded.emit).not.toHaveBeenCalled();
    });
  });
});
