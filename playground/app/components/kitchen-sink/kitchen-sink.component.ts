import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Observable, of } from 'rxjs';


@Component({
  selector: 'kitchen-sink',
  templateUrl: './kitchen-sink.component.html',
  styleUrls: ['./kitchen-sink.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KitchenSinkComponent {

  public email;

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
