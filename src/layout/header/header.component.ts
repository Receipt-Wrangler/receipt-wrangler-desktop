import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { AuthState } from 'src/store/auth.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Select(AuthState.isLoggedIn) public isLoggedIn!: Observable<boolean>;
}
