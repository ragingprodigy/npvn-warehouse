import { XHRBackend, RequestOptions } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { environment } from '../../environments/environment';
import { NpvnHttp } from './npvn.http';

export class Config {
  static EMAIL = environment.default_email;
  static PASSWORD = environment.default_password;
}

export const EVENTS = {
  LOGGED_IN: 'logged_in',
  TOKEN_EXPIRED: 'token_expired',
  LOGIN_ERROR: 'login_error'
};

export const LOCAL_STORAGE_PREFIX = 'NPVN_LS__';

export function provideHttpfactory (backend: XHRBackend, defaultOptions: RequestOptions, storage: LocalStorageService) {
  return new NpvnHttp(backend, defaultOptions, storage);
}
