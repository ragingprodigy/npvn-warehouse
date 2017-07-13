import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseProvider } from './base.provider';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class NpvnService {
  constructor(private _http: Http, private bp: BaseProvider) { }

  public login(payload: any): Observable<any> {
    return this._http.post('login', payload)
    .map(this.bp.extractResponse)
    .catch(this.bp.handleError);
  }
}
