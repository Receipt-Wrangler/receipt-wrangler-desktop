import { Component } from "@angular/core";
import { SharedUiModule } from "../../shared-ui/shared-ui.module";

@Component({
  selector: "app-system-emails",
  standalone: true,
  imports: [
    SharedUiModule
  ],
  templateUrl: "./system-emails.component.html",
  styleUrl: "./system-emails.component.scss"
})
export class SystemEmailsComponent {

}
