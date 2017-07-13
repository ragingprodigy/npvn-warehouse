import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

interface Event {
  key: string;
  data?: any;
}

@Injectable()
export class Notifier {
  private _bus: Subject<Event>;

  constructor() {
    this._bus = new Subject<Event>();
  }

  broadcast(key: any, data?: any) {
    this._bus.next({ key, data });
  }

  on<T>(key: any): Observable<T> {
    return this._bus.asObservable()
    .filter(event => event.key === key)
    .map(event => <T>event.data);
  }
}
