import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FsApi } from '@firestitch/api';
import { FsMessage } from '@firestitch/message';
import { IFsPasswordConfig } from '@firestitch/password';

import { tap } from 'rxjs/operators';


@Component({
  selector: 'fs-force-password-change',
  templateUrl: './force-password-change.component.html',
  styleUrls: ['./force-password-change.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForcePasswordChangeComponent implements OnInit {

  public password: string = null;
  public config: IFsPasswordConfig;

  private _api = inject(FsApi);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _message = inject(FsMessage);

  public ngOnInit(): void {
    this.config = {
      minLength: 6,
      enableCurrentPassword: false,
      exclude: ['password'],
    };
  }

  public save = () => {
    return this._api
      .post('accounts/password/change/force"', {
        password: this.password,
      })
      .pipe(
        tap(() => {
          const redirect = this._route.snapshot.queryParams.redirect || '/';
          this._router.navigateByUrl(redirect);
          this._message.success('Password successfully changed');
        }),
      );
  };

  public cancel() {
    this._router.navigateByUrl('/signin');
  }

}
