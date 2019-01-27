import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login.component';
import { SigninComponent } from './signin.component';
import { SignupComponent } from './signup.component';
import { AboutComponent } from './about.component';
import { ForgotpasswordComponent } from './forgotpassword.component';

import { MaterialModule } from 'app/shared/_material/material.module';
import { DepartmentService } from 'app/core/services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AuthRoutingModule
  ],
  declarations: [LoginComponent, SigninComponent, SignupComponent, AboutComponent, ForgotpasswordComponent],
  providers: [DepartmentService]
})
export class AuthModule { }
