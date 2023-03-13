import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatCardModule } from '@angular/material/card';
import { PipesModule } from 'src/pipes/pipes.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule, MatCardModule, PipesModule],
})
export class DashboardModule {}
