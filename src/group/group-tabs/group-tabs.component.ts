import { Component } from '@angular/core';
import { TabConfig } from 'src/shared-ui/tabs/tab-config.interface';

@Component({
  selector: 'app-group-tabs',
  templateUrl: './group-tabs.component.html',
  styleUrls: ['./group-tabs.component.scss'],
})
export class GroupTabsComponent {
  public tabs: TabConfig[] = [];

  public activeLInk: string = '';

  public ngOnInit(): void {
    this.initTabs();
  }

  private initTabs(): void {
    this.tabs = [
      {
        label: 'User Profile',
        routerLink: 'test',
      },
      {
        label: 'User Preferences',
        routerLink: 'user-preferences/view',
      },
    ];
  }
}
