import { AfterViewInit, Component, Input, ViewChild } from "@angular/core";
import { MatAutocompleteTrigger } from "@angular/material/autocomplete";
import { pairwise, tap } from "rxjs";
import { BaseInputComponent } from "../../base-input";
import { InputInterface } from "../../input";

interface StringDifferenceResult {
  difference: string;
  added: boolean;
}


@Component({
  selector: "app-textarea",
  templateUrl: "./textarea.component.html",
  styleUrls: ["./textarea.component.scss"],
})
export class TextareaComponent
  extends BaseInputComponent
  implements InputInterface, AfterViewInit {
  @ViewChild(MatAutocompleteTrigger) public matAutocompleteTrigger!: MatAutocompleteTrigger;

  @ViewChild("textarea") public textarea!: HTMLTextAreaElement;

  @Input() public options: string[] = [];

  @Input() public trigger: string = "";

  public filteredOptions: string[] = [];

  public ngAfterViewInit(): void {
    if (this.trigger) {
      this.listenForTrigger();
    }
  }

  private listenForTrigger(): void {
    this.inputFormControl
      .valueChanges
      .pipe(
        pairwise(),
        tap(([prev, current]) => {
          const difference = this.getStringDifference(prev, current);
          console.warn(difference, "dif");

          if (true) {
            this.matAutocompleteTrigger.openPanel();
            this.filteredOptions = this.options;

          } else if (current.endsWith(" ")) {
            this.matAutocompleteTrigger.closePanel();
          }

          if (this.matAutocompleteTrigger.panelOpen) {
            // this.filteredOptions = this.options.filter(option => option.toLowerCase().includes(value.toLowerCase()));
          }
        }))
      .subscribe();

    // selection aspect to close, but also surroundings
  }

  public getOptionValue(option: string): string {
    const insertionIndex = this.textarea.selectionEnd;
    console.warn(this.inputFormControl.value[insertionIndex]);

    return this.inputFormControl.value + option;
  }

  public getStringDifference(string1: string, string2: string): number[] {
    const result: number[] = [];
    const string1Map = this.getCharacterMap(string1);
    const string2Map = this.getCharacterMap(string2);

    string1Map.forEach((value, key) => {
      const string2Value = string2Map.get(key);
      if (string2Value) {
        const difference = value.filter(index => !string2Value.includes(index));
        result.push(...difference);
      } else {
        result.push(...value);
      }
    });

    string2Map.forEach((value, key) => {
      const string1Value = string1Map.get(key);
      if (string1Value) {
        const difference = value.filter(index => !string1Value.includes(index));
        result.push(...difference);
      } else {
        result.push(...value);
      }
    });


    return result;
  }

  public getCharacterMap(string: string): Map<string, number[]> {
    const map = new Map<string, number[]>();
    const characters = string.split("");

    characters.forEach((character, index) => {
      const exists = map.has(character);
      let value: number[] = [index];
      if (exists) {
        value = map.get(character)!;
        value.push(index);
      }

      map.set(character, value);
    });

    return map;
  }
}
