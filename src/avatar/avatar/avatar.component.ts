import { Component, Input } from '@angular/core';
import { Group, User } from '@receipt-wrangler/receipt-wrangler-core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @Input() public user?: User;
  @Input() public group?: Group;
}
