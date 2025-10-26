import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FsApi } from '@firestitch/api';
import { FsMessage } from '@firestitch/message';
import { IFsPasswordConfig, FsPasswordModule } from '@firestitch/password';

import { finalize, tap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';


@Component({
    selector: 'fs-force-password-change',
    templateUrl: './force-password-change.component.html',
    styleUrls: ['./force-password-change.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        FsFormModule,
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        MatFormField,
        MatInput,
        FsPasswordModule,
        MatButton,
    ],
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
      .post('accounts/password/change/force', {
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
    this._api
      .post('auth/signout')
      .pipe(
        finalize(() => {
          this._router.navigateByUrl('/signin');
        }),
      )
      .subscribe();
  }

}
