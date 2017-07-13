import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class NpvnService {

  baseUrl: string = environment.api;
  static token: string;

  public static updateRequestToken(token: string) {
    NpvnService.token = token;
    window.sessionStorage.setItem('token', token);
  }

  constructor(private _http: Http) {
    NpvnService.token = window.sessionStorage.getItem('token');
  }

  protected getFormHeaders(): RequestOptionsArgs {
    return {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    };
  }
}
