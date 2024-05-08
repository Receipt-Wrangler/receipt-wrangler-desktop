import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from "@angular/material/autocomplete";
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

  public lastKnownSelection: number = -1;

  public validEndCharacters = [" ", undefined];

  public ngAfterViewInit(): void {
    if (this.trigger) {
    }
  }

  public onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const value = this.inputFormControl.value;
    let index = this.lastKnownSelection;
    let insertionIndex = this.lastKnownSelection;

    while (index <= value.length) {
      const char = value[index];
      if (this.validEndCharacters.includes(char)) {
        insertionIndex = index;
        break;
      }

      index++;
    }

    this.matAutocompleteTrigger.closePanel();
    this.textarea.nativeElement.selectionEnd = insertionIndex + 1;
  }

  public onSelectionChange(event: Event): void {
    if (this.trigger) {
      this.lastKnownSelection = this.textarea.nativeElement.selectionStart;
      const start = this.textarea.nativeElement.selectionStart - 1;
      const end = this.textarea.nativeElement.selectionEnd - 1;

      if (start !== end) {
        this.matAutocompleteTrigger.closePanel();
        return;
      }

      const wordInCursor = this.getWordInCursor(end);

      if (this.isValidTriggerCharacter(this.inputFormControl.value, end)
        || wordInCursor.startsWith(this.trigger)) {
        this.matAutocompleteTrigger.openPanel();
        this.filterOptions();
      } else {
        this.matAutocompleteTrigger.closePanel();
      }
    }
  }

  private getWordInCursor(startIndex: number): string {
    let index = startIndex;
    const charArray: string[] = [];

    while (index >= 0) {
      const char = this.inputFormControl.value[index];
      if (this.validEndCharacters.includes(char)) {
        break;
      }

      index--;
    }

    index++;

    while (index <= this.inputFormControl.value.length) {
      const char = this.inputFormControl.value[index];

      if (this.validEndCharacters.includes(char)) {
        break;
      }
      charArray.push(char);
      index++;
    }

    return charArray.join("");
  }

  private filterOptions(): void {
    const index = this.textarea.nativeElement.selectionStart - 1;
    const currentWord = this.getTriggerWordFromIndex(index).word;
    this.filteredOptions = this.options.filter(option => option.toLowerCase().includes(currentWord.toLowerCase()));
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

      currentIndex--;
    }

    // NOTE: skips past the trigger character
    currentIndex++;

    while (currentIndex <= this.inputFormControl.value.length) {
      const char = this.inputFormControl.value[currentIndex];
      if (this.validEndCharacters.includes(char)) {
        break;
      }

      charArray.push(char);
      currentIndex++;
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

    return value.slice(0, triggerWord.triggerIndex) + this.trigger + option + value.slice(insertionIndex) + " ";
  }

  private isValidTriggerCharacter(string: string, index: number): boolean {
    const frontCharacter = string[index - 1];
    const backCharacter = string[index + 1];

    return string[index] === this.trigger
      && this.validEndCharacters.includes(frontCharacter)
      && this.validEndCharacters.includes(backCharacter);
  }
}
