import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpModule, Http, RequestOptions } from '@angular/http';

import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';

import {
  UserService,
  RoleService,
  PositionService,
  OrganizationService,
  AuthService,
  CaseService,
  PermissionService,
  FormAnswerService,
  MtaService
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
    RoleService,
    MtaService,
    PositionService,
    OrganizationService,
    AuthService,
    CaseService,
    PermissionService,
    FormAnswerService
  ],
  declarations: [],
})
export class CoreModule { }
