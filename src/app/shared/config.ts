import { XHRBackend, RequestOptions } from '@angular/http';
import { LocalStorageService } from 'angular-2-local-storage';
// import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { NpvnHttp } from './npvn.http';

export const LOCAL_STORAGE_PREFIX = 'NPVN_LS__';

export function provideHttpfactory (backend: XHRBackend, defaultOptions: RequestOptions, storage: LocalStorageService) {
  return new NpvnHttp(backend, defaultOptions, storage);
}

// export function provideAuth0HttpFactory(http: NpvnHttp, options: RequestOptions, storage: LocalStorageService) {
//   const authConfig: AuthConfig = new AuthConfig({
//     tokenName: LOCAL_STORAGE_PREFIX + '.' + NpvnHttp.AUTH_TOKEN,
//     tokenGetter: (() => NpvnHttp.getToken(storage)),
//     globalHeaders: []
//   });
// }
