import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AuthGuard } from './_guards/auth.guard';

import { UserIdleModule } from 'angular-user-idle';
import { DialogService } from './core/services/dialog.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    ReactiveFormsModule,
    UserIdleModule.forRoot({idle: 60*5, timeout: 60, ping: 120}),
    // Notifications
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [AuthGuard, DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
