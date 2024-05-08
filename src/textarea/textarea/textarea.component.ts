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

        }))
      .subscribe();

    // selection aspect to close, but also surroundings
    // TODO: get insertion working correctly
  }

  public onSelectionChange(event: Event): void {
    const start = this.textarea.nativeElement.selectionStart - 1;
    const end = this.textarea.nativeElement.selectionEnd - 1;

    if (start !== end) {
      this.matAutocompleteTrigger.closePanel();
      return;
    }

    if (this.isValidTriggerCharacter(this.inputFormControl.value, end)
      || this.getTriggerWordFromIndex(end).word) {
      this.matAutocompleteTrigger.openPanel();
      this.filterOptions();
    } else {
      this.matAutocompleteTrigger.closePanel();
    }
  }

  private filterOptions(): void {
    const index = this.textarea.nativeElement.selectionStart - 1;
    //TODO:  capture the current word by getting the current selection, and backtracking to find trigger, then filter off of that
    const currentWord = this.getTriggerWordFromIndex(index);
    this.filteredOptions = this.options.filter(option => option.toLowerCase().includes(currentWord.word.toLowerCase()));
  }

  private getTriggerWordFromIndex(index: number): {
    word: string,
    triggerIndex: number
  } {
    let currentIndex = index;
    let foundTriggerIndex = -1;
    let charArray: string[] = [];
    const result: {
      word: string,
      triggerIndex: number
    } = {
      word: "",
      triggerIndex: -1
    };

    while (currentIndex >= 0) {
      const char = this.inputFormControl.value[currentIndex];
      if (char === this.trigger) {
        foundTriggerIndex = currentIndex;
        break;
      }

      charArray.unshift(char);
      currentIndex--;
    }


    if (foundTriggerIndex !== -1) {
      result.word = charArray.join("");
      result.triggerIndex = foundTriggerIndex;

      return result;
    } else {
      result.word = "";
      result.triggerIndex = -1;
      return result;
    }
  }

  public getOptionValue(option: string): string {
    const insertionIndex = this.textarea.nativeElement.selectionEnd;
    const value = this.inputFormControl.value;
    const triggerWord = this.getTriggerWordFromIndex(insertionIndex - 1);
    
    return value.slice(0, triggerWord.triggerIndex) + this.trigger + option + value.slice(insertionIndex);
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
