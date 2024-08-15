import { FormOption } from "../../interfaces/form-option.interface";
import { WidgetType } from "../../open-api/index";

export const widgetTypeOptions: FormOption[] = [
  {
    value: WidgetType.FilteredReceipts,
    displayValue: "Filtered Receipts",
  },
  {
    value: WidgetType.GroupSummary,
    displayValue: "Group Summary",
  }
];
