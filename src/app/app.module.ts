import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageModule, LocalStorageService } from 'angular-2-local-storage';
import { JwtHelper } from 'angular2-jwt';

import { provideHttpfactory, LOCAL_STORAGE_PREFIX } from './shared/config';
import { BaseProvider } from './shared/base.provider';
import { NpvnService } from './shared/npvn.service';
import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth.guard';
import { Notifier } from './shared/notifier';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginModule } from './login/login.module';
import { LoaderComponent } from './shared/loader.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpModule,
    LocalStorageModule.withConfig({
      prefix: LOCAL_STORAGE_PREFIX,
      storageType: 'sessionStorage'
    }),
    LoginModule,
    AppRoutingModule
  ],
  providers: [
    BaseProvider, NpvnService, AuthGuard, AuthService, Notifier, JwtHelper,
    { provide: Http, useFactory: provideHttpfactory, deps: [ XHRBackend, RequestOptions, LocalStorageService ] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
