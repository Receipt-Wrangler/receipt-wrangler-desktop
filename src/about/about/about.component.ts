import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { About } from "../../open-api/index";
import { SharedUiModule } from "../../shared-ui/shared-ui.module";
import { AboutState } from "../../store/about.state";
import { StoreModule } from "../../store/store.module";

@Component({
  selector: "app-about",
  standalone: true,
  imports: [
    CommonModule,
    SharedUiModule,
    StoreModule
  ],
  templateUrl: "./about.component.html",
  styleUrl: "./about.component.scss"
})
export class AboutComponent {
  @Select(AboutState.about) public about!: Observable<About>;

}
