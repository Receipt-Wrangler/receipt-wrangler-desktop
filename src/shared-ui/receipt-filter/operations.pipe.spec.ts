import { OperationsPipe } from "./operations.pipe";

describe("OperationsPipe", () => {
  it("create an instance", () => {
    const pipe = new OperationsPipe();
    expect(pipe).toBeTruthy();
  });

  it("return empty array when the value is not recognized", () => {
    const pipe = new OperationsPipe();

    const result = pipe.transform("bad value", true);

    expect(result).toEqual([]);
  });

  it("should return options for date", () => {
    const pipe = new OperationsPipe();

    const result = pipe.transform("date", true);

    expect(result).toEqual([
      "Equals",
      "Greater than",
      "Less than",
    ]);
  });

  it("should return options for text", () => {
    const pipe = new OperationsPipe();

    const result = pipe.transform("text", true);

    expect(result).toEqual(["Contains", "Equals"]);
  });

  it("should return options for number", () => {
    const pipe = new OperationsPipe();

    const result = pipe.transform("number", true);

    expect(result).toEqual([
      "Equals",
      "Greater than",
      "Less than",
    ]);
  });

  it("should return options for list", () => {
    const pipe = new OperationsPipe();

    const result = pipe.transform("list", true);

    expect(result).toEqual(["Contains"]);
  });

  it("should return options for users", () => {
    const pipe = new OperationsPipe();

    const result = pipe.transform("users", true);

    expect(result).toEqual(["Contains"]);
  });
});
