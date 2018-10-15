import { AppConfigService } from './_services/app-config.service';
import { BrowserModule, Title } from '@angular/platform-browser';
import { LOCALE_ID, NgModule, APP_INITIALIZER } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { WaitComponent } from './wait/wait.component';
import { AppRoutingModule } from './_routes/app-routing.module';

import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function initializeApp(appConfig: AppConfigService) {
  return () => appConfig.load();
}

// export function createTranslateLoader(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    PasswordResetComponent,
    WaitComponent,
  ],
  imports: [
    SweetAlert2Module.forRoot(),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
    }),
    AppRoutingModule
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfigService],
      multi:  true
    },
    {provide: LOCALE_ID, useValue: 'ES'},
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
