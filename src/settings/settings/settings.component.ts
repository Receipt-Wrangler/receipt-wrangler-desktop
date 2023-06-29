import { Component } from '@angular/core';
import { DEFAULT_HOST_CLASS } from 'src/constants';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  host: DEFAULT_HOST_CLASS,
})
export class SettingsComponent {
  links = ['User Profile'];
  activeLink = this.links[0];
}
