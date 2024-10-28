import { Component } from "@angular/core";
import { SharedUiModule } from "../../shared-ui/shared-ui.module";

@Component({
  selector: "app-about",
  standalone: true,
  imports: [
    SharedUiModule
  ],
  templateUrl: "./about.component.html",
  styleUrl: "./about.component.scss"
})
export class AboutComponent {

}
