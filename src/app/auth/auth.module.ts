import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login.component';
import { SigninComponent } from './signin.component';
import { SignupComponent } from './signup.component';
import { AboutComponent } from './about.component';
import { ForgotpasswordComponent } from './forgotpassword.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ],
  declarations: [LoginComponent, SigninComponent, SignupComponent, AboutComponent, ForgotpasswordComponent]
})
export class AuthModule { }
