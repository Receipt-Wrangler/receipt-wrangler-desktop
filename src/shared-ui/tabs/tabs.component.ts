import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TabConfig } from './tab-config.interface';
import { NavigationEnd, Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit, OnChanges {
  @Input() public tabs: TabConfig[] = [];

  public activeLink: string = '';

  constructor(private router: Router) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['tabs']) {
      this.setActiveTab();
    }
  }
  public ngOnInit(): void {
    this.listenToRouteChanges();
  }

  private setActiveTab(): void {
    const url = this.router.url;
    const tab = this.tabs.find((t) => url.includes(t.routerLink.split('/')[0]));
    this.activeLink = tab ? tab.routerLink : this.tabs[0].routerLink;
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
}
