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
  constructor(private router: Router) {}

  public tabs: TabConfig[] = [];

  public activeLink: string = '';

  public ngOnInit(): void {
    this.initTabs();
    this.setActiveTab();
    this.listenToRouteChanges();
  }

  private listenToRouteChanges(): void {
    this.router.events
      .pipe(
        tap((event) => {
          if (event instanceof NavigationEnd) {
            this.setActiveTab();
          }
        })
      )
      .subscribe();
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

  private setActiveTab(): void {
    const url = this.router.url;
    const tab = this.tabs.find((t) => url.includes(t.routerLink.split('/')[0]));
    this.activeLink = tab ? tab.routerLink : this.tabs[0].routerLink;
  }
}
