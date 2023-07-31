import { FormControl, FormGroup, Validators } from "@angular/forms";
import { GroupMember } from "@noah231515/receipt-wrangler-core";

export function buildGroupMemberForm(groupMember?: GroupMember): FormGroup {
  return new FormGroup({
    userId: new FormControl(groupMember?.userId ?? '', Validators.required),
    groupRole: new FormControl(
      groupMember?.groupRole ?? '',
      Validators.required
    ),
    groupId: new FormControl(groupMember?.groupId ?? undefined),
  });
}
