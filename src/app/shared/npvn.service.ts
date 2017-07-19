import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseProvider } from './base.provider';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class NpvnService {
  constructor(private _http: Http, private bp: BaseProvider) { }

  /**
   * List Device Types
   * @return Observable<Array<any>>
   */
  public listDeviceTypes(): Observable<Array<any>> {
    return this._http.get(this.bp.getFullUrl('list-devices'))
    .map(this.bp.extractResponse)
    .catch(this.bp.handleError);
  }

  public getDevice(identifier: string): Observable<any> {
    return this._http.get(this.bp.getFullUrl('devices/{identifier}', { identifier }))
    .map(this.bp.extractResponse)
    .catch(this.bp.handleError);
  }

  /**
   * Check if device has been added before
   *
   * @param imei string
   */
  public checkDevice(imei: string): Observable<any> {
    return this._http.get(this.bp.getFullUrl('check-device/{imei}', { imei }))
    .map(this.bp.extractResponse)
    .catch(this.bp.handleError);
  }
}
