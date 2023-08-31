import { GroupMember } from '@receipt-wrangler/receipt-wrangler-core';
import { FormOption } from 'src/interfaces/form-option.interface';
import { formatStatus } from 'src/utils';

export const GROUP_ROLE_OPTIONS: FormOption[] = Object.keys(
  GroupMember.GroupRoleEnum
).map((key) => {
  const value = (GroupMember.GroupRoleEnum as any)[key];
  return {
    value: value,
    displayValue: formatStatus(value),
  };
});
