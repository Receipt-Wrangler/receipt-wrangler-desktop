import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetAuthState } from 'src/store/auth.state.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'receipt-wrangler';
  constructor(private store: Store) {}
  public ngOnInit(): void {
    this.store.dispatch(new SetAuthState());
    // get fresh toekn if need to
  }
}
