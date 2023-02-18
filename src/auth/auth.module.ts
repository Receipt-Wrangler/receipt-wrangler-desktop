import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/pipes/pipes.module';
import { InputModule } from 'src/input/input.module';
import { ButtonModule } from 'src/button/button.module';
import { DirectivesModule } from 'src/directives/directives.module';

@NgModule({
  declarations: [SignUpComponent],
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
