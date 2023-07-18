import { PagedRequestField } from 'src/api';

export const listOperationOptions = Object.values(
  PagedRequestField.OperationEnum
).filter((k) => k === 'CONTAINS');

export const dateOperationOptions = Object.values(
  PagedRequestField.OperationEnum
).filter((k) => !k.includes('CONTAINS'));

export const numberOperationOptions = Object.values(
  PagedRequestField.OperationEnum
).filter((k) => !k.includes('CONTAINS'));

export const textOperationOptions = Object.values(
  PagedRequestField.OperationEnum
).filter((k) => !k.includes('THAN'));

export const usersOperationOptions = Object.values(
  PagedRequestField.OperationEnum
).filter((k) => k === 'CONTAINS');
