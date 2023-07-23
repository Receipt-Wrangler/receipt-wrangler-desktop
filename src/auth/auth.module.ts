import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@noah231515/receipt-wrangler-core';
import { DirectivesModule } from 'src/directives/directives.module';
import { InputModule } from '@noah231515/receipt-wrangler-core';
import { PipesModule } from 'src/pipes/pipes.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthForm } from './sign-up/auth-form.component';

@NgModule({
  declarations: [AuthForm],
  imports: [
    AuthRoutingModule,
    ButtonModule,
    CommonModule,
    DirectivesModule,
    InputModule,
    PipesModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
