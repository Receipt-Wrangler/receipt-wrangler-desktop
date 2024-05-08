import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";
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

  @ViewChild("nativeTextarea") public textarea!: ElementRef<HTMLTextAreaElement>;

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

          if (this.shouldShowAutocomplete(prev, current, difference)) {
            this.matAutocompleteTrigger.openPanel();
            this.filterOptions();

          } else if (current.endsWith(" ")) {
            this.matAutocompleteTrigger.closePanel();
          }

          if (this.matAutocompleteTrigger.panelOpen) {
            this.filterOptions();
          }
        }))
      .subscribe();

    // selection aspect to close, but also surroundings
  }

  private filterOptions(): void {
    const index = this.textarea.nativeElement.selectionStart - 1;
    //TODO:  capture the current word by getting the current selection, and backtracking to find trigger, then filter off of that
    const currentWord = this.getTriggerWordFromIndex(index);
    console.warn(currentWord, "current word");
    this.filteredOptions = this.options.filter(option => option.toLowerCase().includes(currentWord.toLowerCase()));
    console.warn(this.filteredOptions, "filtered options");

  }

  private getTriggerWordFromIndex(index: number): string {
    let currentIndex = index;
    let foundTrigger = false;
    let result: string[] = [];

    while (currentIndex > 0) {
      const char = this.inputFormControl.value[currentIndex];
      if (char === this.trigger) {
        foundTrigger = true;
        break;
      }

      result.unshift(char);
      currentIndex--;
    }

    if (foundTrigger) {
      return result.join("");
    } else {
      return "";
    }
  }

  public getOptionValue(option: string): string {
    const insertionIndex = this.textarea.nativeElement.selectionEnd;

    return this.inputFormControl.value + option;
  }

  public shouldShowAutocomplete(prev: string, current: string, differences: number[]): boolean {
    for (let i = 0; i < differences.length; i++) {

      if (this.isValidTriggerCharacter(current, differences[i]) || this.getTriggerWordFromIndex(differences[i])) {
        return true;
      }
    }

    return current.endsWith(this.trigger);
  }

  private isValidTriggerCharacter(string: string, index: number): boolean {
    const validEndCharacters = [" ", undefined];
    const frontCharacter = string[index - 1];
    const backCharacter = string[index + 1];

    console.warn(string[index], "string[index]");
    console.warn(frontCharacter, backCharacter, "front and back");

    return string[index] === this.trigger
      && validEndCharacters.includes(frontCharacter)
      && validEndCharacters.includes(backCharacter);
  }

  public getStringDifference(string1: string, string2: string): number[] {
    const result: number[] = [];
    let longString;
    let shortString;

    if (string1.length > string2.length) {
      longString = string1;
      shortString = string2;
    } else {
      longString = string2;
      shortString = string1;
    }


    for (let i = 0; i < longString.length; i++) {
      if (longString[i] !== shortString[i]) {
        result.push(i);
      }
    }

    return result;
  }
}
