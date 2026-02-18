import { NgModule } from '@angular/core';

import { PasswordResetComponent } from './components/password-reset/password-reset.component';


@NgModule({
  imports: [
    PasswordResetComponent,
  ],
  exports: [
    PasswordResetComponent,
  ],
})
export class FsPasswordResetModule {
}
