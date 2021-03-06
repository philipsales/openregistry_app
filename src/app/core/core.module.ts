import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpModule, Http, RequestOptions } from '@angular/http';

import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';

import {
  UserService,
  ForgotpasswordService,
  RoleService,
  PositionService,
  OrganizationService,
  AuthService,
  CaseService,
  PermissionService,
  FormAnswerService,
  MtaService,
  SpecService,
  SpecTypeService
} from './services';
import { environment } from 'environments/environment';

export function getToken() {
  return localStorage.getItem('access_token');
};

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        authScheme: 'JWT ',
        whitelistedDomains: environment.API_ALLOWED_DOMAINS
      }
    })
  ],
  providers: [
    UserService,
    ForgotpasswordService,
    RoleService,
    MtaService,
    PositionService,
    OrganizationService,
    AuthService,
    CaseService,
    PermissionService,
    FormAnswerService,
    SpecService,
    SpecTypeService
  ],
  declarations: [],
})
export class CoreModule { }
