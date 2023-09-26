import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagsListComponent } from './categories-list/tags-list.component';

const routes: Routes = [
  {
    path: '',
    component: TagsListComponent,
  },
  {
    path: '',
    redirectTo: 'tags',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TagsRoutingModule {}
