import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Observable, of } from 'rxjs';
import { PasswordResetComponent } from '../../../../src/app/modules/password-reset/components/password-reset/password-reset.component';


@Component({
    selector: 'kitchen-sink',
    templateUrl: './kitchen-sink.component.html',
    styleUrls: ['./kitchen-sink.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [PasswordResetComponent],
})
export class KitchenSinkComponent {

  public email;
  public title;
  public subtitle;

  public requestCode = (email: string): Observable<any> => {
    return of(true);
  };

  public verifyCode = (code: string): Observable<any> => {
    return of(true);
  };

  public savePassword = (code: string, password: string): Observable<any> => {
    return of(true);
  };

  public log(message): void {
    console.log(message);
  }

}
