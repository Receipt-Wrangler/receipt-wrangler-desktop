import { Group, User } from "src/api";

import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @Input() public user?: User;
  @Input() public group?: Group;
}
