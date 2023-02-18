import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { UsersService } from 'src/api/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private usersService: UsersService) {}

  public ngOnInit(): void {
    this.usersService.geAmountOwedForUser().pipe(take(1)).subscribe();
  }
}
