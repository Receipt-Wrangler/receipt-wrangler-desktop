import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthForm } from './sign-up/auth-form.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/pipes/pipes.module';
import { InputModule } from 'src/input/input.module';
import { ButtonModule } from 'src/button/button.module';
import { DirectivesModule } from 'src/directives/directives.module';

@NgModule({
  declarations: [AuthForm],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    PipesModule,
    InputModule,
    ButtonModule,
    DirectivesModule,
  ],
})
export class AuthModule {}
