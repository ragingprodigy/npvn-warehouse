import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageModule, LocalStorageService } from 'angular-2-local-storage';

import { provideHttpfactory, LOCAL_STORAGE_PREFIX } from './shared/config';
import { NpvnService } from './shared/npvn.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

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
    AppRoutingModule
  ],
  providers: [
    NpvnService,
    { provide: Http, useFactory: provideHttpfactory, deps: [ XHRBackend, RequestOptions, LocalStorageService ] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
