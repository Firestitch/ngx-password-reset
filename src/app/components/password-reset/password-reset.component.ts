import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { FsMessage } from '@firestitch/message';

import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'fs-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordResetComponent implements OnInit {

  @Input() public email: string = null;
  @Input() public requestCode: (email: string) => Observable<any>;
  @Input() public verifyCode: (code: string) => Observable<any>;
  @Input() public savePassword: (code: string, password: string) => Observable<any>;
  @Input()
  public emailExists: (email: string) => Observable<boolean>;

  @Output() public titleChange = new EventEmitter<string>();
  @Output() public cancelled = new EventEmitter();
  @Output() public completed = new EventEmitter<{ email: string, password: string, code: string }>();

  public password: string = null;
  public confirmPassword: string = null;
  public code: string = null;
  public mode: 'request' | 'password' | 'code' = 'request';

  constructor(
    private _message: FsMessage,
    private _cdRef: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.titleChange.emit('Password Reset');
  }

  public emailExistsValidator = (control: FormControl): Observable<any> => {
    if (control.value && this.emailExists) {
      return this.emailExists(control.value)
        .pipe(
          switchMap((exists) => {
            return exists ? of(true) : throwError('Could not find your account');
          }),
        );
    }

    return of(true);
  };

  public cancel(): void {
    this.cancelled.emit();
  }

  public validateExists = (control: FormControl): Observable<any> => {
    if (control.value) {
      return this._verifyCode(control.value)
        .pipe(
          catchError(() => {
            return throwError('Invalid code');
          }),
        );
    }

    return of(true);
  };

  public submit = () => {
    if (this.mode === 'request') {
      return this._requestCode();
    }

    if (this.mode === 'code') {
      this.mode = 'password';
      this.titleChange.emit('Change Password');
      this._cdRef.markForCheck();

      return of(true);
    }

    if (this.mode === 'password') {
      return this._savePassword();
    }

    return throwError('Invalid action');
  };

  private _requestCode(): Observable<any> {
    return this.requestCode(this.email)
      .pipe(
        tap(() => {
          this.titleChange.emit('Verification');
          this.mode = 'code';
          this._cdRef.markForCheck();
        }),
      );
  }

  private _verifyCode(code): Observable<any> {
    return this.verifyCode(code);
  }

  private _savePassword(): Observable<any> {
    return this.savePassword(this.code, this.password)
      .pipe(
        tap(() => {
          this._message.success('Your password has been successfully changed');
          this.completed.emit({ email: this.email, password: this.password, code: this.code });
        }),
      );
  }


}
