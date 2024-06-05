import { Component, Input } from "@angular/core";
import { AccordionPanel } from "./accordion-panel.interface";

@Component({
  selector: "app-accordion",
  templateUrl: "./accordion.component.html",
  styleUrl: "./accordion.component.scss"
})
export class AccordionComponent {
  @Input() public panels: AccordionPanel[] = [];
}
