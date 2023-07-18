import { PagedRequestField } from "src/api-new";

export const listOperationOptions = Object.keys(
  PagedRequestField.OperationEnum
).filter((k) => k === 'CONTAINS');

export const dateOperationOptions = Object.keys(
  PagedRequestField.OperationEnum.EQUALS
).filter((k) => !k.includes('CONTAINS'));

export const numberOperationOptions = Object.keys(
  PagedRequestField.OperationEnum.EQUALS
).filter((k) => !k.includes('CONTAINS'));

export const textOperationOptions = Object.keys(
  PagedRequestField.OperationEnum.EQUALS
).filter((k) => !k.includes('THAN'));

export const usersOperationOptions = Object.keys(
  PagedRequestField.OperationEnum.EQUALS
).filter((k) => k === 'CONTAINS');
