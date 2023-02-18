import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectivesModule } from 'src/directives/directives.module';
import { FeatureGuard } from 'src/guards/feature.guard';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: 'sign-up',
    component: SignUpComponent,
    data: {
      isSignUp: true,
      feature: 'enableLocalSignUp',
    },
    canActivate: [FeatureGuard],
  },
  {
    path: 'login',
    component: SignUpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
