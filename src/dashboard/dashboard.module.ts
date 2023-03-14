import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatCardModule } from '@angular/material/card';
import { PipesModule } from 'src/pipes/pipes.module';
import { MatListModule } from '@angular/material/list';
import { SummaryCardComponent } from './summary-card/summary-card.component';

@NgModule({
  declarations: [DashboardComponent, SummaryCardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule,
    PipesModule,
    MatListModule,
  ],
})
export class DashboardModule {}
