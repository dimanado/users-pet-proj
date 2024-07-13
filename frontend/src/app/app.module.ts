import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '@app/shared/shared.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { userReducer } from '@app/core/store/user/user.reducer';
import { loginReducer } from '@app/core/store/login/login.reducer';
import { UserEffects } from '@app/core/store/user/user.effects';
import { LoginEffects } from '@app/core/store/login/login.effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptor } from '@app/core/interceptor/http-interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    SharedModule,
    StoreModule.forRoot({ user: userReducer, login: loginReducer}),
    EffectsModule.forRoot([UserEffects, LoginEffects]),
  ],
  providers: [
    provideHttpClient(
      withInterceptors([httpInterceptor]),
    ),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
