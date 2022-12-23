import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [SignUpComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
