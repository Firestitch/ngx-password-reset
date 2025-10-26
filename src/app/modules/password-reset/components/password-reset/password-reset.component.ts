import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { UntypedFormControl, FormsModule } from '@angular/forms';

import { FsFormDirective, FsFormModule } from '@firestitch/form';
import { FsMessage } from '@firestitch/message';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FsCommonModule } from '@firestitch/common';
import { StackedButtonsComponent } from '../stacked-buttons/stacked-buttons.component';
import { MatButton } from '@angular/material/button';
import { FsLabelModule } from '@firestitch/label';
import { FsCodeInputModule } from '@firestitch/code-input';
import { FsPasswordModule } from '@firestitch/password';


@Component({
    selector: 'fs-password-reset',
    templateUrl: './password-reset.component.html',
    styleUrls: ['./password-reset.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        FsFormModule,
        MatFormField,
        MatLabel,
        MatInput,
        FsCommonModule,
        StackedButtonsComponent,
        MatButton,
        FsLabelModule,
        FsCodeInputModule,
        MatError,
        FsPasswordModule,
    ],
})
export class PasswordResetComponent implements OnInit {
  private _message = inject(FsMessage);
  private _cdRef = inject(ChangeDetectorRef);


  @ViewChild(FsFormDirective)
  public form: FsFormDirective;

  @Input() public email: string = null;
  @Input() public requestCode: (email: string) => Observable<any>;
  @Input() public verifyCode: (code: string) => Observable<any>;
  @Input() public savePassword: (code: string, password: string) => Observable<any>;

  @Output() public titleChange = new EventEmitter<string>();
  @Output() public subtitleChange = new EventEmitter<string>();
  @Output() public cancelled = new EventEmitter();
  @Output() public completed = new EventEmitter<{ email: string, password: string, code: string }>();

  public password: string = null;
  public confirmPassword: string = null;
  public code: string = null;
  public mode: 'request' | 'password' | 'code' = 'request';

  public ngOnInit(): void {
    this.titleChange.emit('Reset your password');
    this.subtitleChange.emit('Enter the email address associated with your account.');
  }

  public cancel(): void {
    this.cancelled.emit();
  }

  public validateExists = (control: UntypedFormControl): Observable<any> => {
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
      this.form.pristine();

      return this._requestCode();
    }

    if (this.mode === 'code') {
      this.form.pristine();

      this.mode = 'password';
      this.titleChange.emit('Set-up new password');
      this.subtitleChange.emit('Create a new and strong password for your account.');
      this._cdRef.markForCheck();

      return of(true);
    }

    if (this.mode === 'password') {
      this.form.pristine();

      return this._savePassword();
    }

    return throwError(() => new Error('Invalid action'));
  };

  private _requestCode(): Observable<any> {
    return this.requestCode(this.email)
      .pipe(
        tap(() => {
          this.titleChange.emit('Let\'s verify it\'s you');
          this.subtitleChange 
            .emit(`An email with a verification code has been sent to ${this.email} to verify it's you.`);
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
