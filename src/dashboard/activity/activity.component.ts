import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { take, tap } from "rxjs";
import { Activity, PagedActivityRequestCommand, SystemTaskService, Widget } from "../../open-api/index";

@Component({
  selector: "app-activity",
  templateUrl: "./activity.component.html",
  styleUrl: "./activity.component.scss"
})
export class ActivityComponent implements OnInit {
  @Input() public widget!: Widget;

  @Input() public groupId?: number;

  public page: number = 1;

  public pageSize: number = 25;

  public activities: Activity[] = [];

  constructor(
    private systemTaskService: SystemTaskService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}


  public ngOnInit(): void {
    this.getData();
  }

  public endOfListReached(): void {
    this.page++;
    this.getData();
  }

  private getData(): void {
    if (!this.groupId) {
      return;
    }

    const command: PagedActivityRequestCommand = {
      groupIds: [this.groupId],
      orderBy: "started_at",
      page: this.page,
      pageSize: this.pageSize,
      sortDirection: "asc"
    };
    this.systemTaskService.getPagedActivities(command)
      .pipe(
        take(1),
        tap((response) => {
          this.activities = [...this.activities, ...response.data];
          this.changeDetectorRef.detectChanges();
        })
      )
      .subscribe();
  }
}
