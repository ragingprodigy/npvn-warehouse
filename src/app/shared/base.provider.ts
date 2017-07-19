import { Injectable } from '@angular/core';
import { Http, Request, Response, BaseRequestOptions, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';

@Injectable()
export class BaseProvider {
  protected baseUrl: string = environment.api;
  
  /**
   * Compute full path to server resource
   *
   * @param uri string
   * @param substitutions any
   */
  public getFullUrl(uri: string, substitutions?: any): string {
    let fullUrl = this.baseUrl + uri;

    if (null !== substitutions && undefined !== substitutions) {
      const keys: Array<string> = Object.keys(substitutions);

      for (const k of keys) {
        fullUrl = fullUrl.split(`{${k}}`).join(substitutions[k]);
      }
    };

    return fullUrl;
  }

  /**
   * Pull out data from a HttpResponse
   *
   * @param res Response
   */
  public extractResponse(res: Response) {
    let body;
    try {
      body = res.json();
    } catch (e) {
      return Observable.throw('Invalid response. Please check your internet connection.');
    }

    return body || {};
  }

  /**
   * Handle Http request errors
   *
   * @param error Response|any
   */
  public handleError(error: Response | any) {
    let errMsg: string;
    let diagnosticMessage: string;

    try {
      if (error instanceof Response) {
        // if (error.status === 401) {
        //   this.notifier.broadcast(EVENTS.TOKEN_EXPIRED);
        // }

        const body = error.json() || '';
        const err = body.message || JSON.stringify(body);
        diagnosticMessage = `${error.status} - ${error.statusText || ''} ${err}`;
        errMsg = `${err}`;
      } else {
        errMsg = error.message ? error.message : error.toString();
        diagnosticMessage = errMsg;
      }
    } catch (e) {
      errMsg = 'Http Message: ' + e.message;
    }

    return Observable.throw(errMsg);
  }
}
