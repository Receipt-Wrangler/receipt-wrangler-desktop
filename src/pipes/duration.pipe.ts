import { Pipe, PipeTransform } from "@angular/core";
import { intervalToDuration, isToday } from "date-fns";

@Pipe({
  name: "duration"
})
export class DurationPipe implements PipeTransform {

  public transform(date: string | Date): string {
    const isDateToday = isToday(date);
    const duration = intervalToDuration({
        start: date,
        end: new Date()
      }
    );

    const hours = (duration?.hours ?? 0);
    const minutes = (duration?.minutes ?? 0);
    const days = (duration?.days ?? 0);

    if (isDateToday && duration?.hours) {
      return `${hours} ${this.pluralize(hours, "hour")} ago`;
    }

    if (isDateToday && duration?.minutes) {
      return `${minutes} ${this.pluralize(minutes, "minute")} ago`;
    }

    if (isDateToday && duration.seconds) {
      return `just now`;
    }

    if (!isDateToday && duration?.days) {
      return `${days} ${this.pluralize(days, "day")} ago`;
    }

    if (!isDateToday && duration?.hours) {
      return `${hours} ${this.pluralize(hours, "hour")} ago`;
    }

    return "";
  }

  private pluralize(count: number, word: string): string {
    if (count > 1) {
      return word + "s";
    }

    return word;
  }
}
