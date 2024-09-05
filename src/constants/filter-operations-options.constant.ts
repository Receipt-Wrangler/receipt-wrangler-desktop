import { FilterOperation } from "../open-api";

export const listOperationOptions = Object.values(FilterOperation).filter(
  (k) => k === "CONTAINS"
);

export const dateOperationOptions = Object.values(FilterOperation).filter(
  (k) => !k.includes("CONTAINS")
);

export const numberOperationOptions = Object.values(FilterOperation).filter(
  (k) => !k.includes("CONTAINS")
);

export const textOperationOptions = Object.values(FilterOperation).filter(
  (k) => !k.includes("THAN")
);

export const usersOperationOptions = Object.values(FilterOperation).filter(
  (k) => k === "CONTAINS"
);
