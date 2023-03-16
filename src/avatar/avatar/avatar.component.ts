import { Component, Input } from '@angular/core';
import { User } from 'src/models';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @Input() public user?: User;
}
