import { FilterOperation } from "../../open-api";
import { OperationsPipe } from "./operations.pipe";

describe("OperationsPipe", () => {
  it("create an instance", () => {
    const pipe = new OperationsPipe();
    expect(pipe).toBeTruthy();
  });

  it("return empty array when the value is not recognized", () => {
    const pipe = new OperationsPipe();

    const result = pipe.transform("bad value");

    expect(result).toEqual([]);
  });

  it("should return options for date", () => {
    const pipe = new OperationsPipe();

    const result = pipe.transform("date");

    expect(result).toEqual([
      FilterOperation.Equals,
      FilterOperation.GreaterThan,
      FilterOperation.LessThan,
    ]);
  });

  it("should return options for text", () => {
    const pipe = new OperationsPipe();

    const result = pipe.transform("text");

    expect(result).toEqual([FilterOperation.Contains, FilterOperation.Equals]);
  });

  it("should return options for number", () => {
    const pipe = new OperationsPipe();

    const result = pipe.transform("number");

    expect(result).toEqual([
      FilterOperation.Equals,
      FilterOperation.GreaterThan,
      FilterOperation.LessThan,
    ]);
  });

  it("should return options for list", () => {
    const pipe = new OperationsPipe();

    const result = pipe.transform("list");

    expect(result).toEqual([FilterOperation.Contains]);
  });

  it("should return options for users", () => {
    const pipe = new OperationsPipe();

    const result = pipe.transform("users");

    expect(result).toEqual([FilterOperation.Contains]);
  });
});
