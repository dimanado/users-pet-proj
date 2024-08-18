import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';
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
import * as baseActions from '@app/core/store/base/base.actions';

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
    {
      provide: APP_INITIALIZER,
      useFactory: (store: Store) => {
        return () => store.dispatch(baseActions.init());
      },
      multi: true,
      deps: [Store]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
