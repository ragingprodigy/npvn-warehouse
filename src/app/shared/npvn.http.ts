import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptionsArgs, Response, ConnectionBackend, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService as Storage } from 'angular-2-local-storage';

@Injectable()
export class NpvnHttp extends Http {
  static AUTH_TOKEN = 'npvn_http_auth_token';
  static token: string;

  public static updateRequestToken(storage: Storage, token: string): boolean {
    NpvnHttp.token = token;
    return storage.set(NpvnHttp.AUTH_TOKEN, token);
  }

  public static getToken(storage: Storage): string {
    return storage.get<string>(NpvnHttp.AUTH_TOKEN);
  }

  public static authTokenExists(storage: Storage): boolean {
    return NpvnHttp.getToken(storage) !== '';
  }

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private storage?: Storage) {
    super(backend, defaultOptions);
    NpvnHttp.token = NpvnHttp.getToken(storage);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, this.transformOptions(options));
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.get(url, this.transformOptions(options));
  }

  post(url: string, payload: any, options?: RequestOptionsArgs): Observable<Response> {
    return super.post(url, payload, this.transformOptions(options));
  }

  private transformOptions(options: RequestOptionsArgs): RequestOptionsArgs {
    if (null !== NpvnHttp.token) {
      if (null === options || undefined === options) {
        options = this.getDefaultOptions();
      }

      if (null === options.headers || undefined === options.headers) {
        options.headers = new Headers();
      }

      options.headers.append(`Authorization`, `Bearer ${NpvnHttp.token}`);
    }

    return options;
  }

  protected getDefaultOptions(): RequestOptions {
    const headers: Headers = new Headers({ 'Content-Type': 'application/json' });
    return new RequestOptions({ headers: headers });
  }
}

