import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { MaterialModule } from './material.module';

@NgModule({ declarations: [],
    exports: [
        MaterialModule,
        ReactiveFormsModule,
        HttpClientModule,
    ], imports: [MaterialModule,
        ReactiveFormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class SharedModule { }
