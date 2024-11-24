import { inject, Injectable } from '@angular/core';
import {
  CanActivate, Router,
  UrlTree,
} from '@angular/router';

import { FsForcePasswordChange } from '../services';


@Injectable()
export class FsForcePasswordChangeGuard implements CanActivate {

  private _router = inject(Router);
  private _forcePassword = inject(FsForcePasswordChange);

  public canActivate(): boolean | UrlTree {
    if (this._forcePassword.requiresPasswordChange) {
      return this._router.createUrlTree(['/']);
    }

    return true;
  }

}
