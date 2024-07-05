import { Pipe, PipeTransform } from "@angular/core";
import {
  dateOperationOptions,
  listOperationOptions,
  numberOperationOptions,
  textOperationOptions,
  usersOperationOptions
} from "src/constants";
import { FilterOperation } from "src/open-api";

@Pipe({
  name: "operations",
})
export class OperationsPipe implements PipeTransform {
  private displayValues: { [key: string]: string } = {
    [FilterOperation.Contains]: "Contains",
    [FilterOperation.Equals]: "Equals",
    [FilterOperation.GreaterThan]: "Greater than",
    [FilterOperation.LessThan]: "Less than",
  };

  public transform(type: string): string[] {
    switch (type) {
      case "date":
        return dateOperationOptions.map((option) => this.displayValues[option]);

      case "text":
        return textOperationOptions.map((option) => this.displayValues[option]);

      case "number":
        return numberOperationOptions.map((option) => this.displayValues[option]);

      case "list":
        return listOperationOptions.map((option) => this.displayValues[option]);

      case "users":
        return usersOperationOptions.map((option) => this.displayValues[option]);

      default:
        return [];
    }
  }
}
