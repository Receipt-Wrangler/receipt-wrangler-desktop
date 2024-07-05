import { CurrencyPipe } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { SystemSettingsState } from "../store/system-settings.state";
import { CustomCurrencyPipe } from "./custom-currency.pipe";

describe("CustomCurrencyPipe", () => {
  let store: Store;
  let pipe: CustomCurrencyPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomCurrencyPipe],
      imports: [NgxsModule.forRoot([SystemSettingsState])],
      providers: [CurrencyPipe, CustomCurrencyPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    store = TestBed.inject(Store);
    pipe = TestBed.inject(CustomCurrencyPipe);

  });

  it("create an instance", () => {
    expect(pipe).toBeTruthy();
  });

  it("should use the currency display", () => {
    store.reset({
      systemSettings: {
        currencyDisplay: "USD ",
      },
    });


    const result = pipe.transform(1.23);
    expect(result).toEqual("USD 1.23");
  });

  it("should set $ string if currencyDisplay does not exist", () => {
    store.reset({
      systemSettings: {},
    });


    const result = pipe.transform(1.23);
    expect(result).toEqual("$1.23");
  });
});
