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

  private rowOpen: BehaviorSubject<number | undefined> = new BehaviorSubject<
    number | undefined
  >(undefined);

  public rowOpenObservable = this.rowOpen.asObservable();

  public handleEditButtonClicked(index: number): void {
    this.rowOpen.next(index);
    this.editButtonClicked.next(index);
  }

  public getCurrentRowOpen(): number | undefined {
    return this.rowOpen.value;
  }

  public handleDeleteButtonClicked(index: number): void {
    this.rowOpen.next(undefined);
    this.deleteButtonClicked.next(index);
  }

  public openLastRow(): void {
    this.rowOpen.next(this.listData.length - 1);
  }

  public closeRow(): void {
    this.rowOpen.next(undefined);
  }
}
