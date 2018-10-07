import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'app/shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersCreateComponent } from './users-create.component';
import { UsersListComponent } from './users-list.component';
import { UsersViewComponent } from './users-view.component';
import { UsersUpdateComponent } from './users-update.component';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      SharedModule,
      UsersRoutingModule,
  ],
  declarations: [
      UsersCreateComponent,
      UsersListComponent,
      UsersViewComponent,
      UsersUpdateComponent,
  ]
})
export class UsersModule { }
