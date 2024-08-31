import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from '@app/core/interceptor/http-interceptor.interceptor';
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { userReducer } from '@app/core/store/user/user.reducer';
import { loginReducer } from '@app/core/store/login/login.reducer';
import { UserEffects } from '@app/core/store/user/user.effects';
import { LoginEffects } from '@app/core/store/login/login.effects';
import { AppComponent } from '@app/app.component';
import * as baseActions from '@app/core/store/base/base.actions';
import { appRoutes } from '@app/app.routing';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
          BrowserModule,
          RouterModule,
          StoreModule.forRoot({ user: userReducer, login: loginReducer }),
          EffectsModule.forRoot([UserEffects, LoginEffects])
        ),
        provideHttpClient(withInterceptors([httpInterceptor])),
        {
            provide: APP_INITIALIZER,
            useFactory: (store: Store) => {
                return () => store.dispatch(baseActions.init());
            },
            multi: true,
            deps: [Store]
        },
        provideAnimations(),
        provideRouter(appRoutes)
    ]
})
  .catch(err => console.error(err));
