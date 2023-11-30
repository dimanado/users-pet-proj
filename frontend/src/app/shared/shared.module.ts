import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
  ],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class SharedModule { }
