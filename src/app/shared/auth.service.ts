import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseProvider } from './base.provider';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { LocalStorageService as Storage } from 'angular-2-local-storage';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Config, EVENTS } from './config';
import { NpvnHttp } from './npvn.http';
import { Notifier } from './notifier';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  private _loggedIn = false;
  private nextUrl: string;

  constructor(
    private bp: BaseProvider,
    private _http: Http,
    private _notifier: Notifier,
    private _router: Router,
    private _tokenHelper: JwtHelper,
    private _storage: Storage
  ) {
    this._notifier.on<string>(EVENTS.LOGGED_IN)
    .subscribe(
      (authToken: string) => {
        this._loggedIn = true;
        NpvnHttp.updateRequestToken(this._storage, authToken);
      }
    )
  }

  private getToken(): string {
    return NpvnHttp.getToken(this._storage);
  }

  public decodeJwt(): any {
    if (!this.loggedIn()) {
      return {};
    }
    return this._tokenHelper.decodeToken(this.getToken());
  }

  public logout(returnUrl?: string) {
    this.nextUrl = returnUrl;
    this._storage.clearAll();
    this._router.navigateByUrl(this.nextUrl);
  }

  public loggedIn(): boolean {
    return tokenNotExpired(null, this.getToken());
  }

  public login(payload: any, successROute: string): Observable<any> {
    const loginObservable: Observable<any> = this._http.post('login', payload).map(this.bp.extractResponse);
    const loginSubject = new Subject<any>();

    loginObservable.subscribe(
      (resp) => {
        if (null !== resp.token) {
          this._notifier.broadcast(EVENTS.LOGGED_IN, resp.token);
          const tokenUpdated = NpvnHttp.updateRequestToken(this._storage, resp.token);
          loginSubject.next(tokenUpdated);

          if (tokenUpdated) {
            this._router.navigate([this.nextUrl === null || this.nextUrl === undefined ? successROute : this.nextUrl]);
          }
        } else {
          this._notifier.broadcast(EVENTS.LOGIN_ERROR, resp);
        }
      },
      error => loginSubject.error(error)
    );

    return loginSubject.asObservable();
  }

}
