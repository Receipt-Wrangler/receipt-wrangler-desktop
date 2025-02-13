import { Component, Input } from "@angular/core";

@Component({
    selector: "app-card",
    templateUrl: "./card.component.html",
    styleUrls: ["./card.component.scss"],
    standalone: false
})
export class CardComponent {
  @Input() public cardStyle: string = "";
}
