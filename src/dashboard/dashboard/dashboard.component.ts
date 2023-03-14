import { Component, OnInit } from '@angular/core';
import { take, tap } from 'rxjs';
import { UsersService } from 'src/api/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {}
