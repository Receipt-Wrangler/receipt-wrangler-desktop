import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { of, switchMap, take, tap } from 'rxjs';
import { SearchService } from 'src/api/search.service';
import { SearchResult } from '../../models';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchbarComponent {
  public results: any[] = [];

  public searchFormControl = new FormControl('');

  public displayWith = (searchResult: SearchResult) => {
    return searchResult?.name;
  };

  constructor(private searchService: SearchService, private router: Router) {}

  public ngOnInit(): void {
    this.searchFormControl.valueChanges
      .pipe(
        untilDestroyed(this),
        switchMap((value) =>
          value ? this.searchService.search(value ?? '').pipe(take(1)) : of([])
        ),
        tap((results) => {
          this.results = results;
        })
      )
      .subscribe();
  }

  public navigateToResult(result: SearchResult) {
    switch (result.type) {
      case 'Receipt':
        this.router.navigateByUrl(`/receipts/${result.id}/view`);
        break;
    }
  }
}
