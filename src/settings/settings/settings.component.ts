import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { tap } from 'rxjs';
import { DEFAULT_HOST_CLASS } from 'src/constants';

interface TabConfig {
  label: string;
  routerLink: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  host: DEFAULT_HOST_CLASS,
})
export class SettingsComponent implements OnInit {
  public tabs: TabConfig[] = [];

  public activeLink: string = '';

  public ngOnInit(): void {
    this.initTabs();
  }

  private initTabs(): void {
    this.tabs = [
      {
        label: 'User Profile',
        routerLink: 'user-profile/view',
      },
      {
        label: 'User Preferences',
        routerLink: 'user-preferences/view',
      },
    ];
  }
}
