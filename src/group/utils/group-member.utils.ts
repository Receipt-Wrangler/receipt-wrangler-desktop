import { GroupMember } from "src/api";

import { FormControl, FormGroup, Validators } from "@angular/forms";

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
