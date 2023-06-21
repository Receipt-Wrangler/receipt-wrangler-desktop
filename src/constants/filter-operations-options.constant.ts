import { PagedRequestFilterOperation } from 'src/api/commands/paged-request-command';

export const dateOperationOptions = Object.keys(
  PagedRequestFilterOperation
).filter((k) => !k.includes('CONTAINS'));

export const numberOperationOptions = Object.keys(
  PagedRequestFilterOperation
).filter((k) => !k.includes('CONTAINS'));

export const textOperationOptions = Object.keys(
  PagedRequestFilterOperation
).filter((k) => !k.includes('THAN'));

export const usersOperationOptions = Object.keys(
  PagedRequestFilterOperation
).filter((k) => k === 'CONTAINS');
