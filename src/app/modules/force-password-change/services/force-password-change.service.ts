import { inject, Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

import { FsCookie } from '@firestitch/cookie';

@Injectable({
  providedIn: 'root',
})
export class FsForcePasswordChange {

  private readonly _passwordChangePath = '/password/change';
  private _cookie = inject(FsCookie);
  private _router = inject(Router);

  public enforcePasswordChange(redirectUrl: string): UrlTree | null {
    if (!this.requiresPasswordChange) {
      return null;
    }
    const pathname = new URL(redirectUrl, 'http://x').pathname;
    const isRedirectToSelf =
      pathname.startsWith(this._passwordChangePath);
    const redirect = isRedirectToSelf ? '/' : redirectUrl;

    return this._router.createUrlTree(
      [this._passwordChangePath],
      { queryParams: { redirect } },
    );
  }

  public get requiresPasswordChange() {
    return this._cookie.exists('Token-Force-Password-Change');
  }

}
