import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { FsForcePasswordChange } from '../services';


@Injectable({
  providedIn: 'root',
})
export class FsForcePasswordChangeGuard implements CanActivate {

  private _forcePassword = inject(FsForcePasswordChange);

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (this._forcePassword.requiresPasswordChange) {
      return this._forcePassword.enforcePasswordChange(state.url);
    }

    return true;
  }

}
