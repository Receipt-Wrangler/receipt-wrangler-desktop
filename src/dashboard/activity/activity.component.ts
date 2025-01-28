import { ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { Store } from "@ngxs/store";
import { take, tap } from "rxjs";
import { Activity, GroupRole, PagedActivityRequestCommand, SystemTaskService, SystemTaskStatus, Widget } from "../../open-api/index";
import { SnackbarService } from "../../services/index";
import { GroupState } from "../../store/index";

@Component({
  selector: "app-activity",
  templateUrl: "./activity.component.html",
  styleUrl: "./activity.component.scss",
  encapsulation: ViewEncapsulation.None
})
export class ActivityComponent implements OnInit {
  @Input() public widget!: Widget;

  @Input() public groupId?: number;

  public page: number = 1;

  public pageSize: number = 25;

  public activities: Activity[] = [];

  public ranActivities: { [key: number]: boolean } = {};

  protected readonly SystemTaskStatus = SystemTaskStatus;

  protected readonly GroupRole = GroupRole;

  constructor(
    private systemTaskService: SystemTaskService,
    private snackbarService: SnackbarService,
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store
  ) {}


  public ngOnInit(): void {
    this.getData();
  }

  public endOfListReached(): void {
    this.page++;
    this.getData();
  }

  public onRefreshButtonClick(id: number): void {
    this.systemTaskService
      .rerunActivity(id)
      .pipe(
        take(1),
        tap(() => {
          this.snackbarService.success("Activity has been successfully queued.");
          this.ranActivities[id] = true;
          this.changeDetectorRef.detectChanges();
        })
      ).subscribe();
  }

  private getData(): void {
    if (!this.groupId) {
      return;
    }

    const command: PagedActivityRequestCommand = {
      groupIds: this.getGroupIds(),
      orderBy: "started_at",
      page: this.page,
      pageSize: this.pageSize,
      sortDirection: "desc"
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

  private getGroupIds(): number[] {
    const group = this.store.selectSnapshot(GroupState.getGroupById(this.groupId?.toString() ?? ""));
    if (group?.isAllGroup) {
      return this.store.selectSnapshot(GroupState.groupsWithoutAll).map((group) => group.id);
    } else {
      return [this.groupId ?? 0];
    }
  }
}
