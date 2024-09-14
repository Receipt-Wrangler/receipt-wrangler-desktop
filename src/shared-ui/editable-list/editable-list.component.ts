import { Component, Input, Output, TemplateRef } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-editable-list",
  templateUrl: "./editable-list.component.html",
  styleUrl: "./editable-list.component.scss"
})
export class EditableListComponent {
  @Input() public listData: any[] = [];

  @Input() public itemTitleTemplate!: TemplateRef<any>;

  @Input() public itemSubtitleTemplate!: TemplateRef<any>;

  @Input() public trackByKey: string = "";

  @Input() public editTemplate?: TemplateRef<any>;

  @Output() public editButtonClicked: BehaviorSubject<number> = new BehaviorSubject<number>(-1);

  @Output() public deleteButtonClicked: BehaviorSubject<number> = new BehaviorSubject<number>(-1);

  public rowOpen: BehaviorSubject<number | undefined> = new BehaviorSubject<
    number | undefined
  >(undefined);

  public handleEditButtonClicked(index: number): void {
    this.rowOpen.next(index);
    this.editButtonClicked.next(index);
  }

  public handleDeleteButtonClicked(index: number): void {
    this.rowOpen.next(undefined);
    this.deleteButtonClicked.next(index);
  }
}
