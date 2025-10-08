import { inject, Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

import { FsCookie } from '@firestitch/cookie';

@Injectable({
  providedIn: 'root',
})
export class FsForcePasswordChange {

  private _cookie = inject(FsCookie);
  private _router = inject(Router);

  public enforcePasswordChange(redirectUrl: string): UrlTree | null {
    if (this.requiresPasswordChange) {
      return this._router.createUrlTree(['/password/change'], { queryParams: { redirect: redirectUrl } });
    }

    return null;
  }

  public get requiresPasswordChange() {
    return this._cookie.exists('Token-Force-Password-Change');
  }

}
