import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { of, switchMap, take, tap } from 'rxjs';
import { SearchService } from 'src/api/search.service';

@UntilDestroy()
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent {
  public results: any[] = [];

  public searchFormControl = new FormControl('');

  public displayFn = () => {
    return '';
  };

  constructor(private searchService: SearchService) {}

  public ngOnInit(): void {
    this.searchFormControl.valueChanges
      .pipe(
        untilDestroyed(this),
        switchMap((value) =>
          value ? this.searchService.search(value ?? '').pipe(take(1)) : of([])
        )
      )
      .subscribe();
  }
}
