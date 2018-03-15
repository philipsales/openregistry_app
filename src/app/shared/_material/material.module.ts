import { NgModule } from '@angular/core';

import 'hammerjs';
import { MatCheckboxModule, MatCheckbox, MatExpansionModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatAccordion } from '@angular/material';

@NgModule({
  imports: [
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatListModule,
    MatTableModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatExpansionModule,
  ],
  exports: [
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatMenuModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatListModule,
    MatTableModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatExpansionModule,
  ],
  declarations: [],
  providers: []
})
export class MaterialModule { }
