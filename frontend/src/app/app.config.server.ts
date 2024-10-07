import { mergeApplicationConfig, ApplicationConfig, APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { loginReducer } from '@app/core/store/login/login.reducer';
import { userReducer } from '@app/core/store/user/user.reducer';
import { Store, StoreModule } from '@ngrx/store';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { appRoutes } from '@app/app.routing';
import { provideRouter, RouterModule } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { httpInterceptor } from '@app/core/interceptor/http-interceptor.interceptor';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '@app/core/store/user/user.effects';
import { LoginEffects } from '@app/core/store/login/login.effects';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import * as baseActions from '@app/core/store/base/base.actions';

const serverConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      RouterModule.forRoot(appRoutes), // Ensure RouterModule is included here
      StoreModule.forRoot({ user: userReducer, login: loginReducer }),
      EffectsModule.forRoot([UserEffects, LoginEffects])
    ),
    provideHttpClient(withInterceptors([httpInterceptor]), withFetch()),
    {
      provide: APP_INITIALIZER,
      useFactory: (store: Store) => {
        return () => store.dispatch(baseActions.init());
      },
      multi: true,
      deps: [Store]
    },
    provideAnimations(),
    provideRouter(appRoutes),
    provideClientHydration(),

  ],
};

export const config = mergeApplicationConfig(serverConfig);
